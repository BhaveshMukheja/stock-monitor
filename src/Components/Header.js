import React from 'react'
import Search from './Search'
import ThemeIcon from './ThemeIcon'



const Header = ({name}) => {
  return (
    <>
        <h1 className="text-5xl xl:px-32">{name}</h1>
    <div className='xl:px-32'>
        <Search/>
    </div>
    <ThemeIcon/>
    </>
  )
}

export default Header