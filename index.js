const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const imageRoute = require('./api/ImageUpload')
const contactRoute = require('./api/ContactUs')
const projectIdeaRouter = require('./api/ProjectIdeas')
const path = require('path');
const app = express();

mongoose.connect("mongodb://localhost/TWF")
mongoose.Promise = global.Promise

app.use((req, res, next ) => {
    res.header("Access-Control-Allow-Origin","*") // we can put a specific webpage or website instead of * to allow access to apis
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization") // we can also give * as the second parameter string
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods","PUT, POST, GET, PATCH, DELETE")
        return res.status(200).json({})
    }
    next() // if we dont put next here, this will block any incoming request and expecting to get OPTIONS here
})

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/static', express.static('public'))
app.use("/upload",imageRoute)
app.use("/admin/contact-us",contactRoute)
app.use('/admin/project-ideas', projectIdeaRouter)
app.use('/admin/membership',require('./Routes/Membership'))
app.use('/file',require('./Routes/ImageShow'))
app.get("/test",(req, res)=>{
    res.send("Hello!")
})
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(process.env.port || 5000, function(){
    console.log("Server Started at 5000");
})