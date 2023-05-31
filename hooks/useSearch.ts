import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useSearch = (query: string) => {
  const { data, error, isValidating } = useSWR(
    query ? `/api/search?q=${query}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  )
  return { data, error, isValidating }
}

export default useSearch
