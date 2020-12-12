const mongoose = require('mongoose');

const ProjectIdeaSchema = new mongoose.Schema({
    full_name:{ type: String, },
    phone:{ type: String },
    email:{ type:String,required:true, },
    address:{type:String},
    idea_message:{type:String},
    
})

module.exports.ProjectIdeas = new mongoose.model('ProjectIdeas',ProjectIdeaSchema, 'ProjectIdeas');

