import React from 'react'
import Card from './Card'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green, pink } from '@mui/material/colors';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { mockStockQuote } from '../Constants/mock';

console.log(mockStockQuote)

const Overview = ({symbol, price, change, changePercent, currency}) => {
  return (
    <Card>
        <span className='absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl'>
            {symbol}
        </span>
        <div className="w-full h-full flex items-center justify-around p-5">
            <span className='text-2xl xl:text-xl 2xl:text-5xl flex items-center'>

            ${price}
            <span className='text-lg xl:text-xl 2xl:text-2xl text-neutal-400 m-2'>
                {currency}
            </span>
            </span>
            <span className={`text-lg xl:text-xl 
        2l:text-2xl ${change>0?"text-green-400":"text-red-500"}`}>
            {change} <span>({changePercent}%)</span>
            </span>
      
        </div>
        <span className='absolute right-2 bottom-2'>
            
            <button><AddCircleIcon hover sx={{ color: green[300], ":hover":{color:green[500]}}} /></button>
            <button> <RemoveCircleIcon hover sx={{ color: pink[300], ":hover":{color:pink[500]} }} /></button>
        
   
      </span>
    </Card>
  )
}

export default Overview