import { query, ClaudeAgentOptions } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync } from "fs";

const category = process.env.CATEGORY || "all";
const forceRefresh = process.env.FORCE_REFRESH || "false";

const prompt = readFileSync(".claude/commands/update-readme.md", "utf-8");

const fullPrompt = `
${prompt}

Category filter for this run: ${category}
Force refresh: ${forceRefresh}
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
      "Bash",
      "mcp__perplexity-ask__perplexity_ask",
    ],
    maxTurns: 50,
    permissionMode: "bypassPermissions",
    allowDangerouslySkipPermissions: true,
  },
})) {
  if ("result" in message) {
    console.log(message.result);
  }
}
