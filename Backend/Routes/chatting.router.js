const express = require("express");
const app = express.Router();
const mongoose = require("mongoose");
const chattingapps = require("./chatting.model");

const AuthMiddleware = (req,res,next)=>{
    chattingapps.find().exec()
    .then((res)=>{
      if(res.length>9){
        let {_id}= res[0];
        chattingapps.deleteOne({_id:_id}).exec();
        next();

      }
      else{
        next();

      }
    })

}

app.use(AuthMiddleware);

app.get("/", (req, res) => {
    chattingapps.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        chattingapps: result,
      });
    })
    .catch((result) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.post("/", (req, res) => {
    const chattingapp = new chattingapps({
      _id: new mongoose.Types.ObjectId(),
      message: req.body.message,
      photoURL: req.body.photoURL,
     
    });
    chattingapp
      .save()
      .then((result) => {
        res.status(200).json({
          newProduct: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

  app.delete("/:id", (req, res, next) => {
    chattingapps.deleteOne({ _id: req.params.id })
    .then((result) => {
        res.status(200).json({
          message: "Message Deleted",
        });
    })
    .catch((err) => {
        res.status(500).json({
          error: err,
        });
    });
  });

  app.patch("/:id",async(req,res,next)=>{
    
      const id = req.params.id;
      const updatedInfo = await chattingapps.findByIdAndUpdate(id,{...req.body},{ new: true });
      res.status(200).json(updatedInfo);
  
    })
  

module.exports = app;