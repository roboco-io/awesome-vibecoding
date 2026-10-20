import { CATEGORIES } from "./categories.mjs";
import { README_FILES, MANAGED_FILES, prepareUpdates, links } from "./readme-updates.mjs";
import { shortlistEntries, normalizeResourceUrl, findRegistryEntry, applyRegistryUpdate } from "./catalog-status.mjs";
import { scoreTotal, isProtected, isScoreFresh } from "./registration-policy.mjs";

const VERIFIED = "docs/verified-catalog.md";
const HISTORY = "docs/catalog-history.md";
const REGISTRY = "data/catalog-status.json";

const sameUrl = (a, b) => normalizeResourceUrl(a) === normalizeResourceUrl(b);
const linksTo = (text, url) => [...links(text).keys()].some(link => sameUrl(link, url));

function checkSuperseded(entries, outgoing, proposal, resources, { policy, today }) {
  const { replacement, categoryScores = [] } = proposal;
  if (isProtected(findRegistryEntry(resources, outgoing.url) || {}, today, policy)) throw new Error("The outgoing entry is still protected from superseded replacement");
  if (replacement.covers !== true) throw new Error("A superseded replacement requires covers: true");
  if (typeof replacement.rationale !== "string" || !replacement.rationale.trim()) throw new Error("A superseded replacement requires a rationale");
  const totals = new Map();
  for (const row of entries) {
    const entry = findRegistryEntry(resources, row.url) || {};
    if (isProtected(entry, today, policy)) continue;
    const scores = categoryScores.find(item => sameUrl(item.url, row.url))?.scores ?? (isScoreFresh(entry, today, policy) ? entry.scores : undefined);
    if (!scores) throw new Error(`Missing a fresh score for ${row.url}`);
    totals.set(row.url, scoreTotal(scores, policy));
  }
  const outgoingTotal = totals.get(outgoing.url);
  if (Math.min(...totals.values()) < outgoingTotal) throw new Error("The outgoing entry must have the lowest score in its category");
  if (scoreTotal(proposal.scores, policy) <= outgoingTotal) throw new Error("The incoming score must be strictly higher than the outgoing score");
}

function checkDisqualified(replacement, { policy, approved, observedUrls = [] }) {
  const allowed = [...policy.disqualifications, ...(approved ? policy.approvalOnlyDisqualifications : [])];
  if (!allowed.includes(replacement.disqualification)) throw new Error(`Unsupported disqualification without approval: ${replacement.disqualification}`);
  if (!Array.isArray(replacement.evidenceUrls) || !replacement.evidenceUrls.length) throw new Error("A disqualified replacement requires evidence URLs");
  for (const url of replacement.evidenceUrls) if (!observedUrls.some(seen => sameUrl(seen, url))) throw new Error(`Disqualification evidence was not observed in this run: ${url}`);
}

export function prepareCatalogUpdates(originals, proposal, ctx) {
  const { requiredUrl, policy, today, issueUrl } = ctx;
  if (proposal?.status !== "processed") return prepareUpdates(originals, proposal, { requiredUrl });
  if (typeof originals[REGISTRY] !== "string") throw new Error(`${REGISTRY} is not available`);
  const { placement, resource, replacement } = proposal;
  const category = CATEGORIES[resource?.category];
  if (!category) throw new Error("A valid resource category is required");
  if (!["readme", "extended"].includes(placement)) throw new Error("Placement must be readme or extended");
  const registry = JSON.parse(originals[REGISTRY]);
  const entries = shortlistEntries(originals["README.md"], resource.category);
  const full = entries.length >= category.limit;
  scoreTotal(proposal.scores, policy);
  let updated;
  let outgoing;
  if (placement === "extended") {
    if (replacement) throw new Error("Extended placement must not include a replacement");
    if (!full) throw new Error("Extended placement requires a full shortlist");
    updated = prepareUpdates(originals, proposal, { readmeUnchanged: true });
    const added = (links(updated[VERIFIED] || "").get(requiredUrl) || 0) - (links(originals[VERIFIED] || "").get(requiredUrl) || 0);
    if (added !== 1 || links(updated[VERIFIED]).get(requiredUrl) !== 1) throw new Error(`${VERIFIED} must gain the requested URL exactly once`);
  } else {
    if (replacement) {
      outgoing = entries.find(entry => sameUrl(entry.url, replacement.outgoingUrl || ""));
      if (!outgoing) throw new Error("The outgoing URL must be a current row of the same category");
      if (replacement.path === "superseded") {
        if (!full) throw new Error("A superseded replacement requires a full shortlist");
        checkSuperseded(entries, outgoing, proposal, registry.resources, ctx);
      } else if (replacement.path === "disqualified") checkDisqualified(replacement, ctx);
      else throw new Error("Replacement path must be disqualified or superseded");
    } else if (full) throw new Error(`${category.title} shortlist is full (${category.limit}); use a replacement or extended placement`);
    updated = prepareUpdates(originals, proposal, { requiredUrl, removableUrls: outgoing ? [outgoing.url] : [] });
    for (const file of README_FILES) {
      const after = shortlistEntries(updated[file], resource.category);
      if (!after.some(entry => entry.url === requiredUrl)) throw new Error(`The requested URL must be added to the ${category.title} category in ${file}`);
      if (after.length > category.limit) throw new Error(`${category.title} shortlist limit (${category.limit}) exceeded in ${file}`);
      if (outgoing && linksTo(updated[file], outgoing.url)) throw new Error(`The outgoing URL must be removed from ${file}`);
    }
    const destination = replacement?.path === "superseded" ? VERIFIED : HISTORY;
    if (outgoing && !linksTo(updated[destination] || "", outgoing.url)) throw new Error(`The outgoing URL must be moved to ${destination}`);
  }
  const data = applyRegistryUpdate(registry, {
    incoming: { id: resource.id, name: resource.name, url: requiredUrl, category: resource.category, location: placement === "readme" ? "shortlist" : "extended", scores: proposal.scores, evidenceUrls: proposal.evidenceUrls },
    outgoing: outgoing && { id: outgoing.id, url: outgoing.url, category: resource.category, disqualification: replacement.path === "disqualified" ? replacement.disqualification : undefined, reason: replacement.rationale, evidenceUrls: replacement.evidenceUrls },
    categoryScores: proposal.categoryScores, today, issueUrl,
  });
  updated[REGISTRY] = JSON.stringify(data, null, 2) + "\n";
  return Object.fromEntries(MANAGED_FILES.filter(file => updated[file] !== originals[file]).map(file => [file, updated[file]]));
}
