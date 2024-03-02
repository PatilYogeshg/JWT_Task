const logger = require("../../Utils/logger");
const { userModel , BlogDataModel} = require('./UserModel')
const secretKey = process.env.secretKey
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

  CraeteUser: async (req, res) => {
    try {
      console.log("In code");
      const newUser = new userModel(req.body);
      const savedUser = await newUser.save();
  
      res.send({
        success: true,
        message: "User Created Successfully",
        data: savedUser
      });
    } catch (error) {
      console.error("Error in user creation:", error);
  
      res.send({
        success: false,
        message: "Error in user creation",
        error: error.message || "Internal Server Error"
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      if (!Email || !Password) {
        return res.send({
          success: false,
          message: "Please provide both email and password"
        });
      }
  
      const user = await userModel.findOne({ Email: Email });
  
      if (!user) {
        return res.send({
          success: false,
          message: "Invalid credentials"
        });
      }
  
      const isMatch = await bcrypt.compare(Password, user.Password);
  
      if (isMatch) {
        const token = jwt.sign({ username: user._id }, secretKey, {
          expiresIn: 60 * 1
        });
  
        res.send({
          success: true,
          message: 'Valid credentials',
          token: token
        });
      } else {
        res.send({
          success: false,
          message: 'Invalid credentials'
        });
      }
    } catch (error) {
      console.error("Error in login:", error);
      res.send({
        success: false,
        message: "Internal Server Error",
        error: error.message || "Unknown error"
      });
    }
  },
  
  AddData : async(req , res) => {
    const blog = req.body;
    console.log(blog);
    try {
        const Data = new BlogDataModel(blog)
        const NewData = await Data.save()
        res.send({
            success: true,
            Message: "Data Save Successfully",
            data: NewData
        });
    } catch (error) {
        res.send({
            success: false,
            Message: "data not save"
        });
        logger.error(error)
    }
  },

  GetBlog : async(req , res) => {
    try{
      const Data =  await BlogDataModel.find({UserId : ObjectId(req.query.UserId)})
      if(!Data){
          res.send({
              success : false,
              Message : "no data",
        
          }); 
      }else{
        res.send ({
          success : true,
          message :"data loaded",
          data : Data
        })
      }

  }catch (error) {
      res.send({
          success : false,
          Message : "error",
          error : error
      });
    }
  }

}
