
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var postSchema = new mongoose.Schema({
    _id: String,
    userId:String,
    postText:String,
    img: String, 
    likes: {type:Number,default:0} ,
    comments:{type:Array,default:[]},
    createdAt:{type:Date,default:Date.now()}
},{versionKey:false}); 
module.exports = mongoose.model('Post', postSchema); 
 

