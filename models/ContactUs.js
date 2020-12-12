const mongoose = require('mongoose');


const ContactUsSchema = new mongoose.Schema({
    full_name:{ type: String, },
    subject:{ type: String },
    email:{ type:String,required:true, },
    address:{type:String},
    message:{type:String},
    
})

module.exports.ContactUs = new mongoose.model('ContactUs',ContactUsSchema, 'ContactUs');