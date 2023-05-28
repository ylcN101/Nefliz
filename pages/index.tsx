import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { signOut, getSession } from 'next-auth/react'

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
  const { data: user } = useCurrentUser()

  return (
    <>
      <h2 className="text-4xl mb-8 font-semibold text-gray-300">Home Page</h2>
      <p className="text-white">Logged in as : {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Sign Out
      </button>
    </>
  )
}

export default HomePage
