import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },    
},
  {timestamps: true}
  
);
export default mongoose.models.User|| mongoose.model("user",userSchema); 