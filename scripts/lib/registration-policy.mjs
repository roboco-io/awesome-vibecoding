import { readFile } from "node:fs/promises";

const NUMBERS = ["protectionDays", "scoreTtlDays", "maxSearches", "maxFetches"];
const LISTS = ["scoreItems", "disqualifications", "approvalOnlyDisqualifications", "manualReasons", "independentHosts", "securitySignals", "acceptedAuditStandards"];
const DAY_MS = 86400000;

export async function loadRegistrationPolicy() {
  return validateRegistrationPolicy(JSON.parse(await readFile(new URL("../../data/registration-policy.json", import.meta.url), "utf8")));
}

export function validateRegistrationPolicy(policy) {
  const bad = NUMBERS.some(key => !Number.isInteger(policy[key]) || policy[key] <= 0)
    || LISTS.some(key => !Array.isArray(policy[key]) || !policy[key].length || policy[key].some(item => typeof item !== "string" || !item));
  if (bad || !Array.isArray(policy.verifiedVendors) || policy.verifiedVendors.some(item => typeof item !== "string" || !item || item !== item.toLowerCase())) throw new Error("Invalid registration policy");
  return policy;
}

export function scoreTotal(scores, policy) {
  const keys = Object.keys(scores || {});
  if (keys.length !== policy.scoreItems.length || !policy.scoreItems.every(key => keys.includes(key))) throw new Error(`Scores must contain exactly: ${policy.scoreItems.join(", ")}`);
  for (const key of keys) if (![0, 1, 2].includes(scores[key])) throw new Error(`Score ${key} must be an integer 0-2`);
  return keys.reduce((sum, key) => sum + scores[key], 0);
}

const daysSince = (from, today) => (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS;
const within = (from, today, days) => Boolean(from) && daysSince(from, today) < days;

export const isProtected = (entry, today, policy) => within(entry.listed_on, today, policy.protectionDays);
export const isScoreFresh = (entry, today, policy) => within(entry.scored_on, today, policy.scoreTtlDays);

export const sourceHost = value => new URL(value).hostname.toLowerCase().replace(/^www\./, "");
export const isIndependentHost = (url, policy) => policy.independentHosts.includes(sourceHost(url));

export function isIndependentSource(url, submittedUrl, policy) {
  const [source, submitted] = [sourceHost(url), sourceHost(submittedUrl)];
  if (policy.independentHosts.includes(source)) return true;
  return source !== submitted && !source.endsWith(`.${submitted}`) && !submitted.endsWith(`.${source}`);
}

export const SECURITY_FLAGS = ["storesThirdPartyCredentials", "relaysCredentials", "handlesPayments", "executesRemoteCommands"];

export function isVerifiedVendor(url, verifiedVendors = []) {
  let parsed;
  try { parsed = new URL(url); } catch { return false; }
  const host = parsed.hostname.toLowerCase();
  const owner = parsed.pathname.split("/")[1]?.toLowerCase();
  return verifiedVendors.some(entry => {
    const [vendorHost, vendorOwner] = entry.split("/");
    return vendorOwner ? host === vendorHost && owner === vendorOwner : host === vendorHost || host.endsWith(`.${vendorHost}`);
  });
}

const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// A signal matches as a whole word: not inside a longer word, with an optional plural and optional space, hyphen or underscore between its words.
export function findSecuritySignals(signals, sources) {
  const found = [];
  for (const signal of signals) {
    const pattern = new RegExp(`(?<![a-z0-9])${signal.split(/\s+/).map(escapeRegex).join("[\\s_-]?")}(?:e?s)?(?![a-z])`, "i");
    for (const { source, text } of sources) if (pattern.test(text)) found.push({ signal, source });
  }
  return found;
}

// Risk flags concern services other than the vendor's own, so they hold even verified vendors; signal words hold any tool whose resource URL is not on the verified vendor list. The model's officialVendor flag is informational only.
// In approved runs, credential custody (storing or relaying third-party credentials) is the one flag the maintainer's /approve does not waive: it needs an observed audit with an accepted standard.
export function checkSecurity(security, { signals, vendors = [], resourceUrl, approved, observedUrls, sources = [], acceptedAuditStandards = [] }) {
  const { evidenceUrls } = security || {};
  if (![...SECURITY_FLAGS, "officialVendor"].every(flag => typeof security?.[flag] === "boolean") || !Array.isArray(evidenceUrls) || !evidenceUrls.length || evidenceUrls.length > 5 || evidenceUrls.some(url => typeof url !== "string")) {
    throw new Error(`security requires boolean ${SECURITY_FLAGS.join(", ")}, officialVendor and 1-5 evidenceUrls`);
  }
  if (evidenceUrls.some(url => !observedUrls.has(url))) throw new Error("Security evidence URL was not returned by a search or page fetch in this run");
  if (approved) {
    const { audit } = security;
    const audited = audit && acceptedAuditStandards.includes(audit.standard) && typeof audit.auditor === "string" && audit.auditor.trim() && observedUrls.has(audit.evidenceUrl);
    if ((security.storesThirdPartyCredentials || security.relaysCredentials) && !audited) throw new Error("Credential custody requires audit evidence (acceptedAuditStandards); submit uncertain with manualReason security_sensitive");
    return;
  }
  if (SECURITY_FLAGS.some(flag => security[flag])) throw new Error("Security-sensitive third-party tool; submit uncertain with manualReason security_sensitive");
  if (isVerifiedVendor(resourceUrl, vendors)) return;
  const matched = findSecuritySignals(signals, sources);
  if (matched.length) throw new Error(`Security signals found (${matched.map(({ signal, source }) => `${signal} in ${source}`).join(", ")}); submit uncertain with manualReason security_sensitive unless the resource URL is a verified vendor`);
}
