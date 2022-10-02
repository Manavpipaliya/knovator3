const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userid:{
        type:String,
        required:true

    },
    desc :{
        type:String,
        required:true,
        max:500

    },
   
    location:{

       
            longitude:{
                type:String,
                required:true
            },
            latitude:{
                type:String,
                required:true

            }
            

        
    },



    img:{
        type:String,
    }
        
   

  
  },
    
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);