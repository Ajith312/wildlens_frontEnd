import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NavLinkComp = ({
  componentFrom,
  to,
  title,
  className,
  clickFunction
}) => {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)

  return (
    <NavLink
      to={to}
      onClick={clickFunction}
      className={`${className} ${isActive ? 'active' : ''}`}
    >
      {title}
    </NavLink>
  )
}

export default NavLinkComp
