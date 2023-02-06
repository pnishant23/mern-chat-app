const express = require('express')
const dotenv = require('dotenv')
const chats = require('./data/data')
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes= require('./routes/UserRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

dotenv.config()
// creating an instance of express
const app = express()
connectDB()


app.use(express.json()) //accepting data in json format 

app.get('/', (req,res)=>{
    res.send('server is running...')
})

//getting all the chats
app.get('/api/chats', (req, res)=>{
    res.send(chats)
})

app.use('/api/user', userRoutes)

app.post('/api/test/user', (req, res)=>{
    res.send(req.body.name)
    res.send("hello")
})

// getting single chat based on id
app.get('/api/chats/:id', (req, res)=>{
    const singleChat = chats.find(x=>x._id===req.params.id)
    res.send(singleChat)
   
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server started on http://localhost:${PORT}`.yellow.bold))