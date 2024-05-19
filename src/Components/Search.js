import React, {useContext, useState} from 'react'
import {mockSearchResults} from "../Constants/mock"
import SearchIcon from '@mui/icons-material/Search'
import CrossIcon from '@mui/icons-material/CancelSharp'
import { yellow } from '@mui/material/colors';
import SeacrhResults from './SeacrhResults';
import ThemeContext from '../Context/ThemeContext';
import { fetchStockDetails } from '../api/stockApi';
import StockContext from '../Context/StockContext';

const Search = () => {
    const {darkMode} = useContext(ThemeContext)
    const {setStockSymbol} = useContext(StockContext)
    const [input, setInput] = useState("")
    const [bestMatches, setBestMatches] = useState([])
    const clear = () =>{
        setInput("");
        setBestMatches([]);
    }
    const arr=[];

    const updateBestMatches= async()=>{
        
        try {
            if(input){
                const sym = input.toUpperCase();
                setStockSymbol(sym)
                console.log(sym)
                // const stockDetails = mockSearchResults;
                const stockDetails = await fetchStockDetails(sym);
                console.log(stockDetails)
                
                bestMatches.push(stockDetails)
                
                setBestMatches(bestMatches)
                console.log(bestMatches)
                

            }
        } catch (error) {
            setBestMatches([]);
            console.log(error)
            
        }
        // setBestMatches(mockSearchResults)
    }

  return (
    <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96  ${darkMode?"bg-gray-900 border-gray-800":"bg-white border-neutral-200"}`}>
        <input type="text" value={input} className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode?"bg-gray-900":null}`} placeholder='Search stock...' onChange={(event)=>{
            setInput(event.target.value);
        }} onKeyPress={(event)=>{
            if(event.key==="Enter"){
                updateBestMatches();
            }
        }}/>
      {input && (<button className='m-1' onClick={clear}>
            <CrossIcon className='h-4 w-4'/>
        </button>)}
        <button onClick={updateBestMatches} className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400'>
            <SearchIcon sx={{color: yellow[50]}}/>
        </button>
        {input && bestMatches.length>0 ?(<SeacrhResults results={bestMatches}/>):null}
    </div>
  )
}

export default Search