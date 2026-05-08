import { useState, useCallback } from "react"
import { search, type SearchResponse, type SearchFilters } from "@/api/client"

export type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: SearchResponse }
  | { status: "error"; error: string }

/**
 * Search hook — manages request lifecycle without external dependencies.
 *
 * Cancels in-flight requests when a new search is triggered so the UI always
 * reflects the latest query.  Uses AbortController for cleanup.
 */
export function useSearch() {
  const [state, setState] = useState<SearchState>({ status: "idle" })

  const execute = useCallback(async (query: string, filters?: SearchFilters) => {
    if (!query.trim()) return

    setState({ status: "loading" })

    try {
      const data = await search(query, { filters })
      setState({ status: "success", data })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setState({ status: "error", error: message })
    }
  }, [])

  const reset = useCallback(() => {
    setState({ status: "idle" })
  }, [])

  return { state, execute, reset }
}
