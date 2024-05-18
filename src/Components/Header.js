import React from 'react'
import Search from './Search'
import ThemeIcon from './ThemeIcon'
import Button from '@mui/material/Button';



const Header = ({name}) => {
  return (
    <>
    {/* <Button className='absolute left-2' variant="contained" color="success">
        Error
      </Button> */}
        <h1 className="text-5xl xl:px-32">{name}</h1>
    <div className='xl:px-32'>
        <Search/>
    </div>
    <ThemeIcon/>
    </>
  )
}

export default Header