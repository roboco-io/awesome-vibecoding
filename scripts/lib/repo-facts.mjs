// Live GitHub repository facts, fetched by the application so the model need not trust stale cached search snippets.
export async function fetchRepoFacts(url, { token, fetch: request = globalThis.fetch } = {}) {
  let parsed;
  try { parsed = new URL(url); } catch { return null; }
  const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
  if (parsed.protocol !== "https:" || parsed.hostname !== "github.com" || !owner || !repo) return null;
  const source = `https://api.github.com/repos/${owner}/${repo.replace(/\.git$/, "")}`;
  const get = target => request(target, {
    redirect: "error", signal: AbortSignal.timeout(15000),
    headers: { Accept: "application/vnd.github+json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  try {
    const response = await get(source);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const releaseResponse = await get(`${source}/releases/latest`);
    if (!releaseResponse.ok && releaseResponse.status !== 404) throw new Error(`HTTP ${releaseResponse.status}`);
    const release = releaseResponse.ok ? await releaseResponse.json() : null;
    return {
      source, fetchedAt: new Date().toISOString(), license: data.license?.spdx_id ?? null, archived: Boolean(data.archived), disabled: Boolean(data.disabled),
      pushedAt: data.pushed_at ?? null, defaultBranch: data.default_branch ?? null,
      latestRelease: release ? { tag: release.tag_name ?? null, publishedAt: release.published_at ?? null } : null,
    };
  } catch { return { source, error: "unavailable" }; }
}
