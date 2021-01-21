const mongoose = require("mongoose");
const express = require("express");
const {ProjectIdeas} = require('../models/ProjectIdea');
const router = express.Router()
router.post("/",(req, res, next)=>{
    const newReq = new ProjectIdeas(req.body)
    newReq.save()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.json({
            error:err
        })
    })

})

router.get("/",(req, res, next)=>{
    ProjectIdeas.find()
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
