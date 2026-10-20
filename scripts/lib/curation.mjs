import { isIndependentSource } from "./registration-policy.mjs";
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
  if (requireIndependent && !proposal.evidenceUrls.some(url => independent(url, submittedUrl, policy))) {
    throw new Error("Acceptance requires an independent source; submit uncertain with manualReason conflicting_evidence");
  }
}

function independent(url, submittedUrl, policy) {
  try { return isIndependentSource(url, submittedUrl, policy); } catch { return false; }
}
