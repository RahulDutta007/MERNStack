const mongoose = require("mongoose");
const express = require("express");

const {Membership} = require('../../models/Membership');


  exports.AddMember = async(req, res,next) => {
    try {
        req.body.ImageID = req.file.id; req.body.ImageName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        console.log(req.body.full_name)
        const newReq = new Membership(req.body);
        const save = await newReq.save();
        return res.json({text:"Member Added Successfully",status:"200",data:req.body});
    } catch (error) {
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