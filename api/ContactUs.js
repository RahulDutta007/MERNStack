const mongoose = require("mongoose");
const express = require("express");
const nodemailer = require('nodemailer') 
const {ContactUs} = require('../models/ContactUs');

const router = express.Router()

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"info.twf.ho@gmail.com",
        pass:"bxmreyzttckcomnn"
        //pass:"qwdf45tY"
        //pass:"bbekfgirczoyygrj"
        //pass:"bbekfgirczoyygrj"
    }

})

router.post("/", (req, res, next)=>{
    const {full_name, email, subject, address, message} = req.body
    const newReq = new ContactUs(req.body)
    newReq.save()
    .then(result=>{
        var mailOptions = {
            from: "info.twf.ho@gmail.com",
            to:email,
            subject:"Thank you for contacting us.",
            text:"We will get back to you soon. One of our representatives will assist you."
        }
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err)
            {
                res.json({
                    error: err
                })
            }
            else{
                console.log("Email sent "+info.response)
                res.status(201).json({
                    message:"Query registered and Email sent successfully"
                    
                })
            }
        })
        
    })
    .catch(err=>{
        res.json({
            error: err
        })
    })
   
})

router.get("/",(req, res, next)=>{
    ContactUs.find()
    .then(results=>{
        res.json(results)
    })
    .catch(err=>{
        res.json({
            error: err
        })
    })
})

module.exports = router