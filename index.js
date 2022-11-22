const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const path = require("path");
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")

const express = require("express");
const app = express();
app.use(cookieParser());

// for user routes

const userRoute = require('./routes/userRoute');
app.use(userRoute);

app.use(express.json())
app.use(expressLayouts)
app.use(express.static('public'))
// app.use('/css',express.static(path.join(__dirname + 'public/css')))
// app.use('/img',express.static(path.join(__dirname + 'public/img')))
// app.use('/js',express.static(path.join(__dirname + 'public/js')))
// app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname,'public')))


// for admin routes


const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute);

app.use('/home',userRoute);

app.use((req,res,next)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
