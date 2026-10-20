import { readFile } from "node:fs/promises";

const NUMBERS = ["protectionDays", "scoreTtlDays", "maxSearches", "maxFetches"];
const LISTS = ["scoreItems", "disqualifications", "approvalOnlyDisqualifications", "manualReasons", "independentHosts"];
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

export function isIndependentSource(url, submittedUrl, policy) {
  const host = value => new URL(value).hostname.toLowerCase().replace(/^www\./, "");
  const [source, submitted] = [host(url), host(submittedUrl)];
  if (policy.independentHosts.includes(source)) return true;
  return source !== submitted && !source.endsWith(`.${submitted}`) && !submitted.endsWith(`.${source}`);
}
