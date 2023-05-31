import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BsBell, BsChevronDown, BsSearch, BsX } from 'react-icons/bs'
import NavbarItem from './NavbarItem'
import MobileMenu from './MobileMenu'
import AccountMenu from './AccountMenu'
import useCurrentUser from '@/hooks/useCurrentUser'

const TOP_OFFSET = 70
const Navbar = () => {
  const router = useRouter()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackGround, setShowBackground] = useState(false)
  const { data: user } = useCurrentUser()

  const avatarImage = user?.image || '/images/default-red.png'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }
  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu)
  }

  const scrollTo = (event: any) => {
    const id = event.currentTarget.id
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else if (id === 'list') {
      const element = document.getElementById('trending')
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <nav className="w-full fixed z-40">
      <div
        className={` pr-4 md:px-[2rem] py-6 flex flex-row items-center transition duration-500 ${
          showBackGround ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}>
        <div
          className="
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex
        ">
          <NavbarItem id="home" label="Home" onClick={scrollTo as any} />
          <NavbarItem id="list" label="My List" onClick={scrollTo as any} />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New and Popular" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div
            onClick={() => router.push('/search')}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex item-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src={avatarImage} alt="Avatar" className="w-full h-full" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
