const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../models/users");
const Post = require("../models/Post");

 

//create post 


router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // update Post 

 
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userid === req.body.userid) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // delete post 

    router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userid === req.body.userid) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        }
        else {
            res.status(403).json("you can delete only your post");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);


// like 

// router.put("/:id/like", async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       if (!post.likes.includes(req.body.userid)) {
//         await post.updateOne({ $push: { likes: req.body.userid } });
//         res.status(200).json("The post has been liked");
//       } else {
//         await post.updateOne({ $pull: { likes: req.body.userid } });
//         res.status(200).json("The post has been disliked");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

    // get  posts 
    router.get("/:id", async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          res.status(200).json(post);
        } catch (err) {
          res.status(500).json(err);
        }
      });

    


    // get post witth geolocation with coordinates
    router.get("/location", async (req, res) => {

        try {
            const post = await Post.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [req.params.lng, req.params.lat]
                        },
                        $maxDistance: 100000,
                    },
                },
            });
            res.status(200).json(post);
        } catch (err) {

            res.status(500).json(err);
        }
    });

    // get post with geolocation with coordinates and category
    // router.get("/location/:lat/:lng/:category", async (req, res) => {


    //     try {
    //         const post = await Post.find({
    //             location: {
                    
    

      

      // // get timeline posts
      // router.get("/timeline/all", async (req, res) => {
      //   try {
      //     const currentUser = await Users.findById(req.body.userid);
      //     const userPosts = await Post.find({ userId: currentUser._id });
      //     const friendPosts = await Promise.all(
      //       currentUser.followings.map((friendId) => {
      //         return Post.find({ userId: friendId });
      //       })
      //     );
      //     res.json(userPosts.concat(...friendPosts))
      //   } catch (err) {
      //     res.status(500).json(err);
      //   }
      // });

      router.get("/timeline/:username", async (req, res) => {
        try {
          const currentUser = await Users.findOne({ username: req.params.username });
          const userPosts = await Post.find({ userId: currentUser._id });
          res.json(userPosts);
        } catch (err) {
          res.status(500).json(err);
        }
      });

      



module.exports = router;