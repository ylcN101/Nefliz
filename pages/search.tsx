import React from 'react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const SearchMovies = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchMovies = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const searchQuery = searchInputRef.current?.value
      if (searchQuery) {
        router.push(`/search/${searchQuery}`)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">Search Movies</h1>
      <div className="flex flex-row items-center justify-center gap-2 mt-4">
        <input
          ref={searchInputRef}
          onKeyDown={searchMovies}
          className="w-96 h-10 px-2 rounded-md outline-none"
          type="text"
          placeholder="Search Movies"
        />
        <button className="w-20 h-10 bg-zinc-900 text-white rounded-md">
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchMovies
