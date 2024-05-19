import Card from "./Card";
import Header from "./Header";
import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import { mockCompanyDetials, mockHistoricalData } from "../Constants/mock";
import ThemeContext from "../Context/ThemeContext";
import StockContext from "../Context/StockContext";
import { fetchHistorialData, fetchQuote, fetchStockDetails } from "../api/stockApi";
import Navbar from "./Navbar";
import Wishlist2 from "./Wishlist2";


const Dashboard = () => {

  const {darkMode}=useContext(ThemeContext)
  const {stockSymbol} = useContext(StockContext)

  const [stockDetials, setStockDetials] = useState({})
  const [quote, setQuote] = useState({})


  useEffect(() => {
    const updateStockDetails=async()=>{
      try {
        console.log("I am here updating stock detials in dashboard")
        const result = await fetchStockDetails(stockSymbol)
        setStockDetials(result)
        
      } catch (error) {
        setStockDetials({})
        console.log(error)
        
      }
    }

    const updateStockOverview=async()=>{
      try {
        console.log("I am here fetching Quote in Dashboard")
        const result = await fetchQuote(stockSymbol)
        console.log(result)
        setQuote(result)
        
      } catch (error) {
        setQuote({})
        console.log(error)
        
      }
    }
    


    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol])
  



  return (
    <>
<Navbar/>

    <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 pt-2 pb-24 font-quicksand  ${darkMode?"bg-gray-900 text-gray-300": "bg-neutral-100"}`}>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex flex-col justify-start items-center">
        <Header name={stockDetials.Name}/>
        </div>
        <div className="md:col-span-2 row-span-4">
            <Chart />
        </div>
        <div>
            <Overview symbol={quote["01. symbol"]} price={quote["05. price"]} change={quote["09. change"]} changePercent={quote["10. changePercent"]}  currency={stockDetials["Currency"]}/>
        </div>
        <div className="row-span-2 xl:row-span-3">

          
            <Details details={stockDetials}/>
        </div>
    </div>
    <Wishlist2 />
    </>
  )
}

export default Dashboard