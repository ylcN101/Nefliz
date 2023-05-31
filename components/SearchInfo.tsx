import React from 'react'

interface SearchInfoProps {
  title: string
}

const SearchInfo: React.FC<SearchInfoProps> = ({ title }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-white text-2xl font-semibold">{title}</div>
    </div>
  )
}

export default SearchInfo
