import express from "express";
import User from "../models/User.js";

var router = express.Router();

/* GET users listing. */
router.get('/users/', function(req, res, next) {

});

// GET user by id
router.get('/userbyid/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    console.log('[GET] User by id - ' + req.params.id);
    res.status(200).send(other);
  } catch (err) {
    console.log('[GET] User by id - Failed - ' + err);
    res.status(500).json(err);
  }
});

// GET user by email 
router.get('/userbyemail', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const { password, ...other } = user._doc;
    console.log('[GET] User by email - ' + req.body.email);
    res.status(200).send(other);
  } catch (err) {
    console.log('[GET] User by email - Failed - ' + err);
    res.status(err.status).json(err);
  }
});

// GET all users 
router.get('/allusers', async (req, res, next) => {
  try {
    const users = await User.find().populate('reviews').sort({_id:-1});
    console.log("[GET] All Users");
    res.status(200).send(users);
  } catch (err) {
    console.log("[GET] All Users - Failed - " + err);
    res.status(err.status).json(err);
  }
});

export default router;
