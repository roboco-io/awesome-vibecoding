import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync } from "fs";

const issueTitle = process.env.ISSUE_TITLE || "";
const issueBody = process.env.ISSUE_BODY || "";
const issueNumber = process.env.ISSUE_NUMBER || "";

const prompt = readFileSync(".github/prompts/issue-approval.md", "utf-8");

const fullPrompt = `
${prompt}

## Issue Details

**Issue #${issueNumber}**: ${issueTitle}

**Issue Body**:
${issueBody}

This issue has been manually approved by a maintainer. Skip quality validation and add the resource directly.
`;

for await (const message of query({
  prompt: fullPrompt,
  options: {
    allowedTools: [
      "Edit",
      "Read",
      "Glob",
      "Grep",
      "Write",
      "Bash(git diff:git status)",
    ],
    maxTurns: 30,
    permissionMode: "bypassPermissions",
    allowDangerouslySkipPermissions: true,
  },
})) {
  if ("result" in message) {
    console.log(message.result);
  }
}
