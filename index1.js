import express  from 'express';

// const express = require('express');

const app = express()

app.listen(8080,()=>{
    console.log("Server started on port 8080")
})

app.get('/',(req,res) =>
{
    res.send("hello world")

})

app.get('/products',(req,res) =>
{
    let products = [{
        "name":"Product1",
        "price":34
    }]

    res.json(products)

})





