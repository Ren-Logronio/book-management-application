import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/token.js";

const router = express.Router();

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // extract token from authHeader string
      token = authHeader.split(' ')[1]
      // verified token returns user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // find user's obj in db and assign to req.user
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
});

router.post("/login", async (req, res) => {
    try {
      console.log("Logging in with email " + req.body.email + " and pass " + req.body.password);
      console.log(req.body, "req");
      const user = await User.findOne({ email: req.body.email });
  
      console.log(user, "user");
  
      !user && res.status(404).send("User not found");
  
      const validPass = await bcrypt.compare(req.body.password, user.password);
      !validPass && res.status(400).json("Wrong Password");

      var cleaned = {
        ...user,
        token: generateToken(user._id), 
      }

      delete cleaned.password;
  
      res.status(200).json(cleaned);
    } catch (err) {
      console.log(err);
    }
});

router.route("/profile")
  .get(protect, asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const user = await User.findById(req.user._id)
    if (user) {
      var cleaned = { 
        ...user,
        token: generateToken(user._id),
      };
      delete cleaned.password;
      res.json(cleaned)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})); 

export default router;