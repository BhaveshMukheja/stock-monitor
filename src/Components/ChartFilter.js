import { buttonGroupClasses } from '@mui/material'
import React from 'react'

const ChartFilter = ({text, active, onClick, infoTypeFilter, infoTypeColor}) => {
    const color = infoTypeColor
    console.log(infoTypeFilter)
  return (
    <button onClick={onClick}  className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer ${active?`bg-${infoTypeColor} border-indigo-700 text-gray-100`:"bg-indigo-300 text-white"} `}>
        {text}m
        </button>
  )
}

export default ChartFilter