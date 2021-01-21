const mongoose = require("mongoose");
const express = require("express");
const nodemailer = require('nodemailer') 
const {Membership} = require('../../models/Membership');
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
      user:"iamsouvik.cs@gmail.com",
      pass:"bbekfgirczoyygrj"
      //pass:"qwdf45tY"
      //pass:"bbekfgirczoyygrj"
      //pass:"bbekfgirczoyygrj"
  }

})

  exports.AddMember = async(req, res,next) => {
    try {
        req.body.ImageID = req.file.id; req.body.ImageName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        console.log(req.body.full_name)
        const newReq = new Membership(req.body);
        const save = await newReq.save();
        console.log("Data saved")
        var mailOptions = {
          from: "iamsouvik.cs@gmail.com",
          to:req.body.email,
          subject:"Greetings from Tribute Welfare.",
          text:"Thank you for submitting your request. We will get back to you soon."
        }
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err)
            {
                console.log("error happened", err)
            }
            else{
                console.log("Email sent "+info.response)
            }
        })
        return res.json({text:"Member Added Successfully and Email has been sent to your mail",status:"200",data:req.body});
    } catch (error) {
      console.log(error)
        return res.json({text:" Request  Unsuccessful",status:"400",error:error.errors});
        next()
    }
    
  }


exports.ShowMembers = async(req, res,next) =>{
  try {
      const data = await Membership.find();
      if(!data) return res.json({text:"Work Successfully",status:"200",data:"No data available yet"});
      return res.json({text:"Work Successfully",status:"200",data:data});
  } catch (error) {
      return res.json({text:" Request  Unsuccessful",status:"400",error:error.errors});
      next()
  }
}