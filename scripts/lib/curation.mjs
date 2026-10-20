import { isIndependentSource, isIndependentHost } from "./registration-policy.mjs";
export const CURATION_CHECKS = ["relevant", "usable", "distinct", "transparent", "maintained", "available_to_new_users", "not_sunsetting"];

export function validateEvidence(proposal, { searched, fetched, submittedUrl, policy, requireIndependent }) {
  if (proposal.status !== "processed") return;
  for (const check of CURATION_CHECKS) {
    if (proposal.checks?.[check] !== true) throw new Error(`Curation criterion must pass: ${check}`);
  }
  if (!Array.isArray(proposal.evidenceUrls) || !proposal.evidenceUrls.length || proposal.evidenceUrls.length > 10) {
    throw new Error("Acceptance requires 1–10 observed evidence URLs");
  }
  for (const url of proposal.evidenceUrls) {
    if (!searched.has(url) && !fetched.has(url)) throw new Error("Evidence URL was not returned by a search or page fetch in this run");
  }
  if (requireIndependent && !proposal.evidenceUrls.some(url => independent(url, { searched, fetched, submittedUrl, policy }))) {
    throw new Error("Acceptance requires an independent source; submit uncertain with manualReason conflicting_evidence");
  }
}

// fetch_page reads only issue URLs, so a fetched page counts only on a listed public repository or registry host.
function independent(url, { searched, fetched, submittedUrl, policy }) {
  try { return (searched.has(url) && isIndependentSource(url, submittedUrl, policy)) || (fetched.has(url) && isIndependentHost(url, policy)); } catch { return false; }
}
