const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  

    
    isAdmin: {
      type: Boolean,
      default: true,
    },
    desc:{
        type:String,
        default:"",
        max:100
    },
    city:{
        type:String,
        default:"",
        max:50 
    }
    },

    
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);