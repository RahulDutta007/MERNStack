const mongoose = require('mongoose');


const MemberShipSchema = new mongoose.Schema({
    full_name:{ type: String, },
    phone_no:{ type: String },
    email:{ type:String,required:true, },
    perm_address:{type:String},
    prsnt_address:{type:String},
    fathers_name:{ type: String, },
    birthday:{ type: String, },
    alternate_no:{ type: String, },
    blood_group:{ type: String, },
    gender:{ type: String, },
    profession:{ type: String, },
    designation:{ type: String, },
    qualification:{ type: String, },
    nationality:{ type: String, },
    aadhar:{ type: String, },
    pan:{ type: String, },
    license:{ type: String, },
    ImageID:{ type: String, },
    ImageName:{ type: String, },
    ImageOriginalName:{ type: String, },
    license:{ type: String, },
    dateAdded:{type:Date,default:Date.now,},
    
})

module.exports.Membership = new mongoose.model('Membership',MemberShipSchema, 'Membership');

