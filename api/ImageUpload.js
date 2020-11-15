const express = require('express')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, './public/images/')
    },
    filename: function(req, file, cb)
    {
        cb(null,  Date.now()+file.originalname)
    }
})

// checking uploaded file type  
const fileType = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
        file.type === 'image/jpeg'
    )
    {
        cb(null, true)
    }
    else{
        cb(new Error('Incorrect File type'), false) // cb(null, false) simply discard the file to be stored but we can provide error message using the working type.
    }
}

// limits and fileFilter are optional if you need file type checking and file size cheking you can use it
const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileType
})

router.post("/",upload.single('Image'),(req, res, next)=>{
    var img=""
    var imagepath=""
    if(req.file)
    {
        console.log("File exists")
        img = req.file
         imagepath = "https://157.245.94.80:5000/static/images/"+req.file.filename
         res.status(200).json({
             imagepath:imagepath
         })
    }
    
    
    
})

module.exports = router
