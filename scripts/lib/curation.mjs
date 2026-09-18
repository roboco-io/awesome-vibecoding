export const CURATION_CHECKS = ["relevant", "usable", "distinct", "transparent", "maintained"];

export function validateEvidence(proposal, observedUrls) {
  if (proposal.status !== "processed") return;
  for (const check of CURATION_CHECKS) {
    if (proposal.checks?.[check] !== true) throw new Error(`Curation criterion must pass: ${check}`);
  }
  if (!Array.isArray(proposal.evidenceUrls) || !proposal.evidenceUrls.length || proposal.evidenceUrls.length > 10) {
    throw new Error("Acceptance requires 1–10 observed evidence URLs");
  }
  for (const url of proposal.evidenceUrls) {
    if (!observedUrls.has(url)) throw new Error("Evidence URL was not returned by a search in this run");
  }
}
