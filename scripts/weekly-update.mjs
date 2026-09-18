import { readFile, appendFile } from "node:fs/promises";
import { runAutomation } from "./lib/pi-runner.mjs";
import { outputRecord } from "./lib/readme-updates.mjs";
import { CATEGORIES, categoryGuide } from "./lib/categories.mjs";

const category = process.env.CATEGORY || "all";
if (category !== "all" && !Object.hasOwn(CATEGORIES, category)) throw new Error("Invalid CATEGORY");
const instructions = await readFile(new URL("../.github/prompts/weekly-update.md", import.meta.url), "utf8");
const policy = await readFile(new URL("../docs/curation-policy.md", import.meta.url), "utf8");
const date = new Date().toISOString().slice(0, 10);
const result = await runAutomation({
  prompt: `${instructions}\n\n${policy}\n\nTask categories:\n${categoryGuide()}\n\nToday's date: ${date}\nCategory: ${category}\nUse current dates in search queries.`,
  weekly: true,
});
if (!["processed", "unchanged"].includes(result.status)) throw new Error(`Weekly update requires review (${result.status})`);
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, outputRecord("result", result.status));
console.log(`Result: ${result.status}`);
