import React from 'react'
import MovieThumbnail from './MovieThumbnail'

const MoviesCollection = ({ results, title }) => {
  return (
    <div className="flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex p-2 -m-2 space-x-6 overflow-x-scroll overflow-y-hidden scrollbar-hide">
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}

export default MoviesCollection
