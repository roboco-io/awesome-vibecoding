import { readFile } from "node:fs/promises";
import { CATEGORIES } from "./categories.mjs";

export function normalizeResourceUrl(value) {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Resource URL must use HTTP(S)");
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  let path = url.pathname.replace(/\/+$/, "");
  if (host === "github.com") {
    const parts = path.split("/");
    parts[1] = parts[1]?.toLowerCase();
    parts[2] = parts[2]?.toLowerCase();
    path = parts.join("/").replace(/\.git$/, "");
    // GitHub repo/file query parameters select presentation, not a new resource.
    if (parts.filter(Boolean).length >= 2) url.search = "";
  }
  for (const key of [...url.searchParams.keys()]) {
    if (/^utm_/i.test(key) || ["fbclid", "gclid"].includes(key.toLowerCase())) url.searchParams.delete(key);
  }
  url.searchParams.sort();
  return `${host}${url.port ? `:${url.port}` : ""}${path}${url.searchParams.size ? `?${url.searchParams}` : ""}`;
}

const identities = resource => [resource.url, ...(resource.aliases || [])].filter(Boolean).map(normalizeResourceUrl);
const matches = (identity, resource) => identities(resource).some(known => identity === known || (resource.location === "excluded" && identity.startsWith(`${known}/`)));

export async function loadCatalogStatus() {
  const data = JSON.parse(await readFile(new URL("../../data/catalog-status.json", import.meta.url), "utf8"));
  if (!Array.isArray(data.resources)) throw new Error("Invalid catalog lifecycle registry");
  return data.resources;
}

export function findResources(query, resources) {
  const search = query.trim().toLowerCase();
  if (!search) return [];
  if (/^https?:\/\//i.test(search)) {
    const identity = normalizeResourceUrl(query);
    return resources.filter(resource => matches(identity, resource)).slice(0, 10);
  }
  return resources.filter(resource => [resource.name, resource.previous_name].some(name => name?.toLowerCase().includes(search))).slice(0, 10);
}

export function assertNewResource(url, resources) {
  const identity = normalizeResourceUrl(url);
  const known = resources.find(resource => matches(identity, resource));
  if (!known) return;
  if (known.status !== "active" || known.location === "excluded") {
    throw new Error(`Known catalog decision: ${known.status}. ${known.name} requires a documented lifecycle re-review, not automatic re-addition.`);
  }
  throw new Error(`${known.name} is already reviewed in the ${known.location} catalog; do not rediscover or duplicate it.`);
}

function shortlistBlock(text, key) {
  return key === "learning"
    ? text.match(/<a id="learning"><\/a>[\s\S]*?(?=<a id="community"><\/a>)/)?.[0]
    : text.match(new RegExp(`<!-- catalog:${key} -->\\n([\\s\\S]*?)<!-- /catalog:${key} -->`))?.[1];
}

const shortlistRows = block => block.split("\n").filter(line => line.startsWith("|") && /\]\(https?:\/\//i.test(line));

export function shortlistEntries(text, category) {
  return shortlistRows(shortlistBlock(text, category) || "").map(line => ({
    id: line.match(/<a id="([^"]+)">/)?.[1] ?? null,
    url: line.match(/\]\((https?:\/\/[^)\s]+)/i)[1],
  }));
}

export function assertShortlistCapacity(text) {
  for (const [key, category] of Object.entries(CATEGORIES)) {
    const block = shortlistBlock(text, key);
    if (block && shortlistRows(block).length > category.limit) throw new Error(`${category.title} shortlist limit (${category.limit}) reached; request editorial review instead of growing the list.`);
  }
}
