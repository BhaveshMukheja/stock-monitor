import React, { useContext, useState } from 'react'
import Card from './Card'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green, pink } from '@mui/material/colors';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { mockStockQuote } from '../Constants/mock';
import UserIdContext from '../Context/UserIdContext';
import axios from 'axios';
import { fetchQuote } from '../api/stockApi';
import Wishlist2 from './Wishlist2';



const host="http://localhost/5555"




const Overview = ({symbol, price, change, changePercent, currency}) => {

  const {userId, setUserId} = useContext(UserIdContext);
const [userWishlist, setUserWishlist] = useState([])

const handleRemoveClick = async(e) =>{

  e.preventDefault();
  try {
    const response = axios.put(`${host}/api/remove/${userId}`, fetchQuote(symbol))
  //  const response = await fetch(`${host}/api/remove/${userId}`,)
    const result = response.data
    setUserWishlist(result.wishlist)


  } catch (error) {
    console.log("Wasn't able to get the wishlist")
     throw new  Error ("Wasn't able to get the wishlist")
  }

 }

 const handleAddClick = async(e) =>{
  e.preventDefault();
  try {
    const response = axios.put(`${host}/api/add/${userId}`, fetchQuote(symbol))
  //  const response = await fetch(`${host}/api/remove/${userId}`,)
    const result = response.data
    setUserWishlist(result.wishlist)



  } catch (error) {
    console.log("Wasn't able to get the wishlist")
     throw new  Error ("Wasn't able to get the wishlist")
  }

 }

 const isPresent = async(symbol)=>{
  try {
    
for (let index = 0; index < userWishlist.length; index++) {
  if(symbol== userWishlist[index]){
    return true;
  }
  else{
   return false;
  }
  
}
  } catch (error) {
    console.log("Error in transvering through the userWishlist in Overview")
  }
 }




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


            {!isPresent(symbol) && (<button onClick={handleRemoveClick} value={symbol}> <RemoveCircleIcon hover sx={{ color: pink[300], ":hover":{color:pink[500]} }} /></button>)}                         
              {isPresent(symbol) && (<button onClick={handleAddClick} value={symbol}><AddCircleIcon hover  sx={{ color: green[300], ":hover":{color:green[500]}}} /></button>)}
           
            
           
            
        
   
      </span>
    </Card>
  )
}

export default Overview