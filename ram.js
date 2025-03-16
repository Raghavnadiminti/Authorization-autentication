const express=require('express')
const mongoose=require('mongoose') 
const cors=require('cors')
const bcrypt=require('bcryptjs')
const {user}=require('./models.js')
const {login,signin,autenticate,home} = require('./controllers')
const jwt = require('jsonwebtoken')

const app=express() 
app.use(express.json)
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))





app.post('/signin',signin)


app.post('/login',login)

app.get('/home',autenticate,home)



app.listen(5000,()=>{
    console.log("server isrunnin auth ")
})