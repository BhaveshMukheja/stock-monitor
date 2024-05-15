import { useState, useContext } from 'react'
import { mockHistoricalData } from '../Constants/mock'
import Card from './Card'
import ChartFilter from './ChartFilter';
import Dropdown from"./Dropdown";
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


const Chart = (historicalData) => {
   
    const {darkMode} = useContext(ThemeContext)
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

const [intervalFilter, setIntervalFilter] = useState("60")
const [data, setData]=useState(mockHistoricalData[`Time Series (${intervalFilter}min)`])


    const [month, setMonth] = useState("");



    Object.keys(data).map((item)=>{
        xLabels.push(item)     
        uData.push(data[item][infoTypeFilter])
          })

  return (
    <Card>
         <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
        <Dropdown  infoTypeFilter={infoTypeFilter}setInfoTypeFilter={setInfoTypeFilter} />
       
        <ul className='flex absolute top-2 right-2 z-40'>
            {Object.keys(interval).map((item)=>{
                return(
                    <li key={item}>
                        <ChartFilter text={item} infoTypeFilter={infoTypeFilter} active={intervalFilter===item} onClick={()=>{
                            setIntervalFilter(item);
                            // setData(mockHistoricalData[`Time Series (${intervalFilter}min)`])                       
                             }}/>
                    </li>
                )
            })}
        </ul>
        
         <LineChart
         margin={{top:10}}
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