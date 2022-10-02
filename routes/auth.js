const router = require("express").Router();
const Users= require("../models/users");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {


    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
    //create new user


    const newUser = new Users({
     username: req.body.username,
        email: req.body.email,
        password:hashedPassword,

    });
    
 
    //save user and respond
   const user =  await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req,res)=>{
    try{
        const  user = await Users.findOne({email:req.body.email});
      if(!user){
          return res.status(404).json({message:"user not found"});
      }
     



        const matchpass = await bcrypt .compare(req.body.password, user.password);
        if(!matchpass){
            return res.status(400).json({message:"wrong password"});
        }
    

        return   res.status(200).json(user);

    } catch(err){
         res.status(500).json({message:err.message});

    }
    
}); 



 



module.exports = router;