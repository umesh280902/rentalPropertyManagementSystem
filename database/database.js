const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/rentalPropertyManagementSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database');
});
const userSchema=new mongoose.Schema({
    firstname: {
        required: true,
        type: String
      },
      lastname:{
        required:true,
        type:String
      },
      phonenumber:{
        required:true,
        type:String,
        minLength:10,
        max:10
      },
      email: {
        required: true,
        type: String
      },
      password: {
        required: true,
        type: String,
        minLength: 8
      }
})
const User=mongoose.model('user',userSchema)
module.exports={router,User}