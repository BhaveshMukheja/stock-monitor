import { buttonGroupClasses } from '@mui/material'
import React from 'react'
import { tailwindChartColorConfig } from '../Constants/config'

const ChartFilter = ({text, active, onClick}) => {
  

  return (
    <button onClick={onClick}  className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer ${active?`bg-indigo-600 border-indigo-700 text-gray-100`:"bg-indigo-400 text-white"} `}>
        {text}m
        </button>
  )
}

export default ChartFilter