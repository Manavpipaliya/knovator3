const router =  require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../models/users');

router.get('/', (req,res)=>{
    res.send("hey this is route users")
})


//

router.get("/all", async(req, res) => {
  
    try {
      const user = await Users.find();
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
 
});




// update user profile
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password  ) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await Users.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
        return res.status(401).json("Unauthorized");
    }
  });


//delte user
router.delete("/:id", async (req, res) => {
    if (req.body.userid === req.params.id || req.body.isAdmin) {
      try {



        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

 

 





 
module.exports = router;