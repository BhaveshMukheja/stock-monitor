import React, { useContext } from 'react'
import ThemeContext from '../Context/ThemeContext'

const SeacrhResults = ({results}) => {

    const {darkMode} = useContext(ThemeContext)
  return (
    <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll  ${darkMode?"bg-gray-900 border-gray-800 custom-scrollbar-dark": "bg-white border-neutral-200 custom-scrollbar"}`}>
        {results.map((item)=>{
            return <li key={item.Symbol} className={`cursor-pointer p-4 m-2 flex items-cneter justify-between rounded-md  ${darkMode?"hover:bg-indigo-600":"hover:bg-indigo-200"}`}>
                <span>{item.Symbol}</span>
                <span>{item.Name}</span>
            </li>
        })}
    </ul>
  )
}

export default SeacrhResults