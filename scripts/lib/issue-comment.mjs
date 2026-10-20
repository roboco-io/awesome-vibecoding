import { CURATION_CHECKS } from "./curation.mjs";
import { SECURITY_FLAGS } from "./registration-policy.mjs";

export const MANUAL_REASON_LABELS = {
  security_sensitive: "Security-sensitive third-party tool",
  directory_or_affiliate: "Directory, list, or affiliate site",
  ambiguous_replacement: "Replacement needs editorial judgment",
  conflicting_evidence: "Conflicting or insufficient evidence",
};

const cell = value => String(value).replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");
const total = scores => Object.values(scores).reduce((sum, score) => sum + score, 0);

function headline({ status, placement, manualReason, replacement }) {
  if (status === "rejected") return "❌ Rejected";
  if (status !== "processed") return `🤔 Needs maintainer review${manualReason ? ` — ${MANUAL_REASON_LABELS[manualReason] || manualReason}` : ""}`;
  if (placement === "extended") return "✅ Added to the extended catalog";
  return replacement ? `✅ Added to the README, replacing ${replacement.outgoingName || replacement.outgoingUrl}` : "✅ Added to the README";
}

export function formatIssueComment(result, { issueUrl } = {}) {
  const { status, placement, reason, checks, evidenceUrls = [], scores, replacement, security } = result;
  const lines = [`## ${headline(result)}`, ""];
  if (status === "processed" && placement === "extended") lines.push("The resource was not added to the README because its category shortlist is full and no README entry met a replacement condition. The reason below names the condition that was not met.", "");
  lines.push(`**Reason:** ${reason}`, "");
  if (replacement) {
    lines.push(`**Replaced entry:** ${replacement.outgoingUrl}`);
    if (replacement.path === "disqualified") lines.push(`**Path:** disqualified (${replacement.disqualification})`);
    else lines.push(`**Path:** superseded, total score ${scores ? total(scores) : "?"} > ${replacement.outgoingTotal ?? "?"}`);
    lines.push("");
  }
  if (checks) lines.push("| Check | Result |", "|---|---|", ...CURATION_CHECKS.map(check => `| ${check} | ${checks[check] === true ? "✅" : checks[check] === false ? "❌" : "—"} |`), "");
  const urls = [...new Set([...evidenceUrls, ...(replacement?.evidenceUrls || []), ...(security?.evidenceUrls || [])])];
  if (urls.length) lines.push("**Evidence:**", ...urls.map(url => `- ${url}`), "");
  if (scores) lines.push("| Score item | Score |", "|---|---|", ...Object.entries(scores).map(([item, score]) => `| ${cell(item)} | ${cell(score)} |`), `| **Total** | **${total(scores)}** |`, "");
  if (security) lines.push("| Security flag | Value |", "|---|---|", ...[...SECURITY_FLAGS, "officialVendor"].map(flag => `| ${flag} | ${security[flag] === true ? "yes" : security[flag] === false ? "no" : "—"} |`), "");
  if (status === "processed" && issueUrl) lines.push(`The Verified date of the new entry links to this issue: ${issueUrl}`, "");
  if (status !== "processed" && status !== "rejected") lines.push("A maintainer can comment `/approve` to process this resource or `/reject [reason]` to close this issue.", "");
  return lines.join("\n");
}
