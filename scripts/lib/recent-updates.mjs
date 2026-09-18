const EMPTY = {
  en: "No verified changes recorded in the last 30 days.",
  ko: "최근 30일 동안 기록된 검증된 변경 사항이 없습니다.",
  ja: "過去30日間に記録された検証済みの変更はありません。",
};

export function refreshRecentUpdates(text, asOf, language = "en") {
  const block = /<!-- recent-updates:start -->\n([\s\S]*?)<!-- recent-updates:end -->/;
  if (!block.test(text)) return text;
  const now = Date.parse(`${asOf}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf) || !Number.isFinite(now) || new Date(now).toISOString().slice(0, 10) !== asOf) throw new Error("Invalid recent-updates date");
  const cutoff = new Date(now - 29 * 86400000).toISOString().slice(0, 10);
  return text.replace(block, (_whole, content) => {
    if (/\]\(https?:\/\//i.test(content)) throw new Error("Recent updates must link to local resource anchors, not duplicate external URLs");
    const lines = content.trim().split("\n");
    const headers = lines.filter(line => line.startsWith("|") && !/^\|\s*\d{4}-/.test(line)).slice(0, 2);
    if (headers.length !== 2) throw new Error("Recent-updates table header is missing");
    const rows = lines.flatMap(line => {
      const match = line.match(/^\|\s*(\d{4}-\d{2}-\d{2})\s*\|/);
      if (!match || match[1] < cutoff || match[1] > asOf) return [];
      const stamp = Date.parse(`${match[1]}T00:00:00Z`);
      if (!Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== match[1]) return [];
      return [{ date: match[1], line }];
    }).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10).map(row => row.line);
    const body = [...headers, ...rows].join("\n") + (rows.length ? "" : `\n\n${EMPTY[language] || EMPTY.en}`);
    return `<!-- recent-updates:start -->\n${body}\n<!-- recent-updates:end -->`;
  });
}
