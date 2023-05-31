import Billboard from '@/components/Billboard'
import InfoModal from '@/components/InfoModal'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import useFavorites from '@/hooks/useFavorites'
import useInfoModal from '@/hooks/useInfoModal'
import useMovieList from '@/hooks/useMovieList'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
function HomePage() {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModal()

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40" onClick={scrollTo.bind(null, 'trending')}>
        <MovieList id="trending" title="Trending Now" data={movies} />
        <MovieList id="favorites" title="My Favorites" data={favorites} />
      </div>
    </>
  )
}

export default HomePage
