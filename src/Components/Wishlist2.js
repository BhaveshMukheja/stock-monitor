import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ThemeContext from '../Context/ThemeContext';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey, lime, pink, red } from '@mui/material/colors';
import Card from './Card';
import { mockStockQuote } from '../Constants/mock';
import { Link } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const mockQuoteList = {
    "01. symbol":"symbol",
    "05. price": "50000",
    "10. change percent": "",
}

const columns = [
    { id: '01. symbol', label: 'Symbol', minWidth: 275, align: 'left' },
    { id: '05. price', label: 'Price', minWidth: 175, align: 'left' },
    {
      id: '10. change percent',
      label: 'Trend',
      minWidth: 250,
      align: 'center',
    },

    {
      id: 'remove',
      label: '',
      minWidth: 150,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
 
  ];
  


const rows = [];

for(var i =0 ; i<mockStockQuote.length;i++){
    let x = {}
    Object.keys(mockQuoteList).map((item)=>{
       
        x[item] = mockStockQuote[i][item]
    })
    rows.push(x)
}




const Wishlist2 = () => {
    // const navigate = useNavigate();
     const {darkMode} = React.useContext(ThemeContext)
     const darkTheme = createTheme({
        typography: {
            fontFamily: 'Quicksand, sans-serif',
          },
        palette: {
          mode: 'dark',
        },
      });

      const lightTheme = createTheme({
        typography: {
            fontFamily: 'Quicksand, sans-serif',
          },
        palette: {
          mode: 'light',
        },
      });
  

    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-7 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  ${darkMode?"bg-gray-900 text-gray-300": "bg-neutral-100"}`} >

      
        <div className="col-span-3  row-span-1 flex flex-col justify-start items-center ">
        <h1 className="text-5xl xl:px-32">Your Wishlist</h1>
        </div>
        

        <div className="col-span-3 row-span-7 ">
            <Card>
        <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
        <Paper sx={{ width: '100%', overflow: 'hidden', height:'100%',  }}>
      <TableContainer sx={{ maxHeight: 440,  }}>
        <Table stickyHeader aria-label="sticky table" 
  >
          <TableHead  sx={darkMode?{
    "& .MuiTableCell-head": {
      backgroundColor: "#6D67D4",
      color:grey[50],
      fontSize:"18px",
      fontWeight:"bold"
      
    }}:{
    "& .MuiTableCell-head": {
      backgroundColor: "#6208EB",
      color:grey[50]
      
    }
  }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                   
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                     
                    {columns.map((column) => {
                      const value = row[column.id];
                      const removeCol = column.id==="remove" 
                      const trendCol = column.id==="10. change percent" 
                 
                   
                    if(removeCol){
                        return(
                            <TableCell>
                            <div className=' flex justify-around items-center'>
                              
                                    
                           <button> <RemoveCircleIcon hover sx={{ color: pink[300], ":hover":{color:pink[500]} }} /></button>
                            <button><OpenInNewIcon/></button>
                               
                            </div>
                            </TableCell>
                        )
                    }
                    else {
                        if(trendCol){
                            
                            return (
                                <TableCell sx={value[0]==='-'?{color:red.A400}:{color:green.A400}} key={column.id} align={column.align}>
                                   {column.format && typeof value === 'number'
                                     ? column.format(value)
                                     : value}
                                 
                                 </TableCell>
                                
                                
                               );
                        }
                        else{
                            
                        }
                        return (
                            <TableCell key={column.id} align={column.align}>
                               {column.format && typeof value === 'number'
                                 ? column.format(value)
                                 : value}
                             
                             </TableCell>
                            
                            
                           );
                    }
                   
                     
                    })}
                     
                  </TableRow>
                 
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
    </ThemeProvider>
    </Card>
        </div>

    </div>
  )
}

export default Wishlist2