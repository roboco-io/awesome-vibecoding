import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync, appendFileSync } from "fs";

const issueTitle = process.env.ISSUE_TITLE || "";
const issueBody = process.env.ISSUE_BODY || "";
const issueNumber = process.env.ISSUE_NUMBER || "";

const prompt = readFileSync(".github/prompts/issue-auto-process.md", "utf-8");

const fullPrompt = `
${prompt}

## Issue Details

**Issue #${issueNumber}**: ${issueTitle}

**Issue Body**:
${issueBody}

Process this issue: validate content quality, add the resource to README.md, then translate to Korean and Japanese.
`;

let resultText = "";

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
    resultText = message.result;
  }
}

console.log(resultText);

// Write structured result to GITHUB_OUTPUT for downstream steps
const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  if (resultText.includes("REJECTED:")) {
    const reason = resultText.match(/REJECTED:\s*(.*)/)?.[1] || "Unknown reason";
    appendFileSync(outputFile, `result=rejected\n`);
    appendFileSync(outputFile, `reason=${reason}\n`);
  } else if (resultText.includes("UNCERTAIN:")) {
    const reason = resultText.match(/UNCERTAIN:\s*(.*)/)?.[1] || "Unknown reason";
    appendFileSync(outputFile, `result=uncertain\n`);
    appendFileSync(outputFile, `reason=${reason}\n`);
  } else {
    appendFileSync(outputFile, `result=processed\n`);
  }
}
