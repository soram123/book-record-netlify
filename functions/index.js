const express = require('express')
const app = express()
const serverless = require('serverless-http');
const mongoose = require('mongoose')
const Book = require('./db/bookModel').Book

// const port = 8080 
const router = express.Router()

let dbUrl = "mongodb+srv://soram:xyz123@book-record.iul7ijl.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbUrl)
 .then(()=>console.log("Mongodb connection successful!"))
 .catch(error=>console.log(`unable to connect due to ${error}`))

// app.use(express.json()) //middleware

 router.get('/',function(req,res){
    res.send("welcome to book store api!")
 })

 router.get('/api/book',(req,res)=>{
    Book.find()
     .then((book)=>{
        res.json(book)
     })
     .catch((err)=>{
        res.json(err)
     })
 })

 router.get('/api/book/:id',(req,res)=>{
    const id = req.params.id 
    Book.findById(id)
      .then((book)=>{
        res.json(book)
      })
      .catch((err)=>{
        res.json(err)
      })
 })
 
 router.post('/api/book',(req,res)=>{
    const body = req.body
    const newBook = new Book(body)
    newBook.save()
    .then((newBook)=>{
        res.json(newBook)
    })
    .catch((err)=>{
        res.json(err)
    })
 })

 router.put('/api/book/:id',(req,res)=>{
    const id = req.params.id 
    const body = req.body
    Book.findByIdAndUpdate(id,body)
        .then((book)=>{
            res.json('successfully updated!')
        })
        .catch((err)=>{
            res.json(err)
        })
 })

 router.delete('/api/book/:id',(req,res)=>{
    const id = req.params.id 
    Book.findByIdAndDelete(id)
        .then((book)=>{
            res.json('successfully deleted!')
        })
        .catch((err)=>{
            res.json(err)
        })
 })
 router.delete('/api/book',(req,res)=>{
     Book.deleteMany()
        .then((book)=>{
            res.json('successfully deleted everything!')
        })
        .catch((err)=>{
            res.json(err)
        })
 })
//  app.listen(port,function(){
//     console.log(`server started on port ${port}`)
//  })
app.use('/.netlify/functions/index',router)
module.exports.handler = serverless(app)

