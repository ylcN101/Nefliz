import { NextPageContext } from 'next'
import useCurrentUser from '@/hooks/useCurrentUser'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

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

const Profiles = () => {
  const router = useRouter()
  const { data: user } = useCurrentUser()
  const avatarImage = user?.image || '/images/default-red.png'
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching
        </h1>
        <div className="flex items-center justify-center mt-10 gap-10">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                w-44
                h-44
                rounded-md
                flex
                items-center
                justify-center
                border-2
                border-transparent
                group-hover:cursor-pointer
                group-hover:border-white
                overflow-hidden
                ">
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="
                mt-4
                text-gray-400
                text-2xl
                text-center
                group-hover:text-white
                group-hover:cursor-pointer
                ">
                <p className="text-white">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profiles
