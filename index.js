const cookieParser = require('cookie-parser')
const express = require('express')
// var cors = require('cors')
require('dotenv').config()
const app = express()
const port = 5555;

//regular middleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//cookie middleware
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')


app.use('/api', userRouter)
// app.use('/api', taskRouter)

app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(port, () => {
    console.log("The server is running on port", port);
})