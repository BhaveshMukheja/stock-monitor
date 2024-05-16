const basePath = 'https://www.alphavantage.co/query?'

export const fetchStockDetails = async(query)=>{
    const url = `${basePath}function=OVERVIEW&symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error as occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
}

export const fetchQuote = async(stockSymbol)=>{
    const url =`${basePath}function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_API_KEY}`
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error as occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
}

export const fetchHistorialData = async(stockSymbol, interval, month) =>{
    const url =`${basePath}function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&month=${month}&interval=${interval}min&apikey=${process.env.REACT_APP_API_KEY}`
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error as occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();

}