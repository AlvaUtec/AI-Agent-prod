import { Index as UpstashIndex } from '@upstash/vector'

const index = new UpstashIndex()

export const queryMovies = async ({
  query,
  filters,
  topK = 5,
}: {
  query: string
  filters?: any
  topK?: number
}) => {
  return index.query({
    data: query,
    topK,
    includeMetadata: true,
    includeData: true,
  })
}