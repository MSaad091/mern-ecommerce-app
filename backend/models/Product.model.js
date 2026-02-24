import mongoose from "mongoose";


const productschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
     description:{
        type:String,
        required:true,
       
    },
     price:{
        type:Number,
        required:true,
      
    },
     stock:{
        type:Number,
        required:true,
        default:1
    },
    category:{
            type:String,
        required:true,
    },
    images:[
        {
            type:String
        }
    ],
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
        isActive: {
      type: Boolean,
      default: true
    }
  
    
},{timestamps:true})

export const Product = mongoose.model("Product",productschema)