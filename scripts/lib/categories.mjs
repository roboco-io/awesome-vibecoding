export const CATEGORIES = {
  code: { title: "Code & Editing", anchor: "code", limit: 10, purpose: "Understand repositories, write features, and refactor code" },
  apps: { title: "App & UI Prototyping", anchor: "apps", limit: 8, purpose: "Create an app or UI prototype" },
  context: { title: "Context, Specs & Integrations", anchor: "context", limit: 8, purpose: "Manage requirements, instructions, documents, and connected tools" },
  quality: { title: "Testing, Review & Security", anchor: "quality", limit: 8, purpose: "Test generated software, review changes, and diagnose failures" },
  delivery: { title: "Deployment & Execution", anchor: "delivery", limit: 6, purpose: "Build, deploy, or run code in an isolated environment" },
  operations: { title: "Agent Workspaces & Usage", anchor: "operations", limit: 8, purpose: "Manage agent sessions, observe runs, and understand usage" },
  learning: { title: "Learn & Practice", anchor: "learning", limit: 12, purpose: "Find a first project, practical workflow, or conceptual explanation" },
};

export function categoryGuide() {
  return Object.entries(CATEGORIES).map(([key, { title, purpose, limit }]) => `- ${key}: ${title} — ${purpose}; shortlist limit ${limit}`).join("\n");
}
