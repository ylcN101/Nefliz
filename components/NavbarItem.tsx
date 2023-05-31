import React from 'react'

interface NavbarItemProps {
  label: string
  onClick?: () => void
  id?: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, onClick, id }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  )
}

export default NavbarItem
