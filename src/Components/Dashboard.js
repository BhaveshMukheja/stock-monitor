import Card from "./Card";
import Header from "./Header";
import React, { useContext } from 'react'
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import { mockCompanyDetials, mockHistoricalData } from "../Constants/mock";
import ThemeContext from "../Context/ThemeContext";


const Dashboard = () => {

  const {darkMode}=useContext(ThemeContext)

  return (

    <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 pt-2 pb-24 font-quicksand  ${darkMode?"bg-gray-900 text-gray-300": "bg-neutral-100"}`}>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex flex-col justify-start items-center">
        <Header name={mockCompanyDetials.Name}/>
        </div>
        <div className="md:col-span-2 row-span-4">
            <Chart historialData={mockHistoricalData}/>
        </div>
        <div>
            <Overview symbol={mockCompanyDetials.Symbol} price={300} change={30} changePercent={10.0}  currency={"USD"}/>
        </div>
        <div className="row-span-2 xl:row-span-3">

          
            <Details details={mockCompanyDetials}/>
        </div>
    </div>
  )
}

export default Dashboard