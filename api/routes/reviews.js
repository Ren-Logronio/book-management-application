
import express from 'express';
import { ObjectId } from 'mongodb'
import Review from "../models/Review.js";

var router = express.Router();

// find review by bookid
router.get('/book/:bookid', async (req, res, next) => {
    try {
        const reviews = await Review.find({book: ObjectId(req.params.bookid)}).populate('user').sort({_id:-1});
        console.log("[GET] Review by BookId" + req.params.bookid);
        res.status(200).send(reviews);
    } catch {
        console.log("[GET] Review by BookId - Failed - " + err);
        res.status(err.status).json(err);
    }
});

// find review by userid 
router.get('/user/:userid', async (req, res, next) => {
    try {
        const reviews = await Review.find({user: ObjectId(req.params.userid)}).populate('book').sort({_id:-1});
        console.log("[GET] Review by BookId" + req.params.userid);
        res.status(200).send(reviews);
    } catch {
        console.log("[GET] Review by BookId - Failed - " + err);
        res.status(err.status).json(err);
    }
});

export default router;