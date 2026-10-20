import { readFile } from "node:fs/promises";

const NUMBERS = ["protectionDays", "scoreTtlDays", "maxSearches", "maxFetches"];
const LISTS = ["scoreItems", "disqualifications", "approvalOnlyDisqualifications", "manualReasons", "independentHosts", "securitySignals"];
const DAY_MS = 86400000;

export async function loadRegistrationPolicy() {
  const policy = JSON.parse(await readFile(new URL("../../data/registration-policy.json", import.meta.url), "utf8"));
  const bad = NUMBERS.some(key => !Number.isInteger(policy[key]) || policy[key] <= 0)
    || LISTS.some(key => !Array.isArray(policy[key]) || !policy[key].length || policy[key].some(item => typeof item !== "string" || !item));
  if (bad) throw new Error("Invalid registration policy");
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

// Risk flags concern services other than the vendor's own, so they hold even official tools; signal words hold any tool that is not an unflagged official vendor tool.
export function checkSecurity(security, { signals, approved, observedUrls, texts = [] }) {
  const { evidenceUrls } = security || {};
  if (![...SECURITY_FLAGS, "officialVendor"].every(flag => typeof security?.[flag] === "boolean") || !Array.isArray(evidenceUrls) || !evidenceUrls.length || evidenceUrls.length > 5 || evidenceUrls.some(url => typeof url !== "string")) {
    throw new Error(`security requires boolean ${SECURITY_FLAGS.join(", ")}, officialVendor and 1-5 evidenceUrls`);
  }
  if (evidenceUrls.some(url => !observedUrls.has(url))) throw new Error("Security evidence URL was not returned by a search or page fetch in this run");
  if (approved) return;
  if (SECURITY_FLAGS.some(flag => security[flag])) throw new Error("Security-sensitive third-party tool; submit uncertain with manualReason security_sensitive");
  if (security.officialVendor) return;
  const text = texts.join("\n").toLowerCase();
  const matched = signals.filter(signal => text.includes(signal));
  if (matched.length) throw new Error(`Security signals found (${matched.join(", ")}); submit uncertain with manualReason security_sensitive unless the resource is an official vendor tool`);
}
