import React, { useContext } from 'react'
import ThemeContext from '../Context/ThemeContext'

const Card = ({children}) => {
  const {darkMode} = useContext(ThemeContext);
  return (
    <div className={`w-full h-full rounded-md relative p-8 border-1 ${darkMode? "bg-gray-900":"bg-white border-neutral-100"}`}>{children}</div>
  )
}

export default Card