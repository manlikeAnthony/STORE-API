require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000;
const connectDB = require('./database/connect')
const MONGO_URI = process.env.MONGO_URI;
const productRouter = require('./routes/products')

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(express.json());
app.use(express.urlencoded({extended :false}))

app.get('/' , (req,res)=>{
    res.send('<h1>store Api</h1><a href="/api/v1/products">product route</a>')
})

app.use('/api/v1/products' , productRouter)

app.use(notFound);
app.use(errorHandlerMiddleware)

const start = async ()=>{
    try{
        await connectDB(MONGO_URI)
        app.listen(PORT , console.log(`server is running on port ${PORT}`))
    }catch(err){
        console.log(err)
    }
}
start()