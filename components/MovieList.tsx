import React from 'react'

import { MovieInterface } from '@/types'
import MovieCard from '@/components/MovieCard'
import { isEmpty } from 'lodash'

interface MovieListProps {
  data: MovieInterface[]
  title: string
  id?: string
}

const MovieList: React.FC<MovieListProps> = ({ data, title, id }) => {
  if (isEmpty(data)) {
    return null
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div id={id} className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
