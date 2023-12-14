
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

router.post('/add', async (req, res) => {
    try {
        console.log("Creating new review");
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (err) {
        console.log(err);
        res.status(err.status).json(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        console.log("Deleting review");
        const review = await Review.findByIdAndDelete(req.params.id);
        res.status(200).json(review);
    } catch (err) {
        console.log(err);
        res.status(errr.status).json(review);
    }
});

export default router;