import { useState, useContext, useEffect } from 'react'
import { mockHistoricalData } from '../Constants/mock'
import Card from './Card'
import ChartFilter from './ChartFilter';
import Dropdown from"./Dropdown";
import Calender from "./Calender"
import dayjs from 'dayjs';
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
    LinePlot,
    MarkPlot,
    lineElementClasses,
    markElementClasses,
  } from '@mui/x-charts/LineChart';
  import { interval, infoTypeColorList } from '../Constants/config';
import ThemeContext from '../Context/ThemeContext';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { fetchHistorialData } from '../api/stockApi';
import StockContext from '../Context/StockContext';


const Chart = (historicalData) => {
   
    const {darkMode} = useContext(ThemeContext)
    const {stockSymbol} = useContext(StockContext)
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      const lightTheme = createTheme({
        palette: {
          mode: 'light',
        },
      });
const uData = []
const xLabels = []

const [infoTypeFilter, setInfoTypeFilter] = useState("4. close")

const [intervalFilter, setIntervalFilter] = useState("5")
const [data, setData]=useState('{}')


    const [dateValue, setDateValue] = useState(dayjs());
     
 const formatedDate = dateValue.format('YYYY-MM')


 useEffect(() => {
     
 const fetchData = async()=>{
  try {
    const result = await fetchHistorialData(stockSymbol, intervalFilter, formatedDate)
    setData(result[`Time Series (${intervalFilter}min)`])
    
    Object.keys(data).map((item)=>{
      xLabels.push(item)     
      uData.push(data[item][infoTypeFilter])
        })
  } catch (error) {
    console.log(error)
    setData('{}')
  }

 }

fetchData()
 
}, [stockSymbol, intervalFilter, dateValue])





    
          

  return (
    <Card>

    
         <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <div className="w-full flex flex-row absolute top-1 left-0  justify-between items-center z-40 gap-x-2">
        <Dropdown infoTypeFilter={infoTypeFilter }setInfoTypeFilter={setInfoTypeFilter} />
        <Calender dateValue={formatedDate} setDateValue={setDateValue}/>
       
        
        
       
        <ul className='flex  top-2 right-2 z-40'>
            {Object.keys(interval).map((item)=>{
                return(
                    <li key={item}>
                        <ChartFilter text={item}  active={intervalFilter===item}  onClick={()=>{
                            setIntervalFilter(item);
                            // setData(mockHistoricalData[`Time Series (${intervalFilter}min)`])                       
                             }}/>
                    </li>
                )
            })}
        </ul>
        </div>
        
         <LineChart className='absolute'
         
        colors={[infoTypeColorList[infoTypeFilter]]}
         
      series={[{ data: uData, showMark: false }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
            stroke: `${infoTypeColorList[infoTypeFilter]}`,
            strokeWidth: 2,
          },
          [`& .${markElementClasses.root}`]: {
              stroke: `${infoTypeColorList[infoTypeFilter]}`,
              scale: '0.6',
              fill: '#fff',
              strokeWidth: 2,
            },
      }}
      disableAxisListener
    />
    <LinePlot />
      <MarkPlot />
    </ThemeProvider>
    </Card>
  )
}

export default Chart