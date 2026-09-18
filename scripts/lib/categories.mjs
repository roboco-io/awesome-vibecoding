export const CATEGORIES = {
  code: { title: "Code & Editing", anchor: "code", purpose: "Understand repositories, write features, and refactor code" },
  apps: { title: "App & UI Prototyping", anchor: "apps", purpose: "Create an app or UI prototype" },
  context: { title: "Context, Specs & Integrations", anchor: "context", purpose: "Manage requirements, instructions, documents, and connected tools" },
  quality: { title: "Testing, Review & Security", anchor: "quality", purpose: "Test generated software, review changes, and diagnose failures" },
  delivery: { title: "Deployment & Execution", anchor: "delivery", purpose: "Build, deploy, or run code in an isolated environment" },
  operations: { title: "Agent Workspaces & Usage", anchor: "operations", purpose: "Manage agent sessions, observe runs, and understand usage" },
  learning: { title: "Learn & Practice", anchor: "learning", purpose: "Find a first project, practical workflow, or conceptual explanation" },
};

export function categoryGuide() {
  return Object.entries(CATEGORIES).map(([key, { title, purpose }]) => `- ${key}: ${title} — ${purpose}`).join("\n");
}
