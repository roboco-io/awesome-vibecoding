export async function searchWeb(query, { apiKey, fetch: request = globalThis.fetch, signal } = {}) {
  if (!apiKey) throw new Error("Missing EXA_API_KEY");
  if (typeof query !== "string" || !query.trim() || query.length > 500) throw new Error("Search query must contain 1–500 characters");
  const response = await request("https://api.exa.ai/search", {
    method: "POST", redirect: "error",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ query, type: "auto", numResults: 5, contents: { text: { maxCharacters: 6000 } } }),
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(30000)]) : AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Exa Search failed (HTTP ${response.status})`);
  const data = await response.json();
  if (!Array.isArray(data.results)) throw new Error("Invalid Exa Search response");
  return data.results.slice(0, 5).map(({ title, url, text, highlights, publishedDate }) => ({
    title: String(title || "").slice(0, 300), url: String(url || ""),
    snippet: String(text || highlights?.join("\n") || "").slice(0, 6000), date: publishedDate,
  }));
}
