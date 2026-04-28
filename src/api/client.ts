/**
 * Faro Search API client.
 *
 * Talks to the Faro backend `POST /search` endpoint.  The API URL is
 * configured via the `VITE_FARO_API_URL` env var (empty = same origin).
 */

export interface SearchFilters {
  domain?: string[];
  language?: string[];
  min_authority_score?: number;
  min_quality_score?: number;
  published_after?: number;
  published_before?: number;
  min_word_count?: number;
}

export interface SearchResult {
  url: string;
  title: string;
  content: string;
  domain: string;
  language: string;
  score: number;
  chunk_index: number;
  quality_score: number;
  published_at: number;
  word_count: number;
  authority_score: number;
  author: string;
  redirected_from: string | null;
}

export interface SearchTiming {
  embedding_ms: number;
  vector_search_ms: number;
  rerank_ms: number;
  total_ms: number;
}

export interface SearchResponse {
  results: SearchResult[];
  search_type: string;
  latency_ms: number;
  total: number;
  timing: SearchTiming | null;
}

const API_BASE = import.meta.env.VITE_FARO_API_URL || "";

/** Generate or retrieve a stable session ID per browser tab. */
function getSessionId(): string {
  const KEY = "faro-session-id";
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

export async function search(
  query: string,
  options?: { limit?: number; offset?: number; filters?: SearchFilters },
): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      limit: options?.limit ?? 10,
      filters: options?.filters ?? {},
      agent_id: "web-ui",
      session_id: getSessionId(),
    }),
  });

  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }

  return res.json() as Promise<SearchResponse>;
}
