const express = require('express');
const router = express.Router();
const UserController  = require('./UserController');
const {Auth} = require('../../Utils/Auth') 


router.post('/CraeteUser' , UserController.CraeteUser);
router.post('/loginUser' , UserController.loginUser);
router.post('/AddData' , UserController.AddData);
router.get('/GetBlog' , Auth,UserController.GetBlog);

module.exports = router;