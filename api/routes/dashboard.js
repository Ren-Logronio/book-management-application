import express from "express";
import Book from "../models/Book.js";
import User from "../models/User.js";

var router = express.Router();

router.get("/", async (req, res) => {
        try {
            await setTimeout(() => { return }, 1000);
            const students = await User.find({userType: "student"});
            const books = await Book.find();
            var studentCount, bookCount, reviewCount;
            studentCount = students.length;
            bookCount = books.length;
            const dash = { dash: [
                {title: "Number of Books", content: bookCount, icon: "Book"},
                {title: "Number of Students", content: studentCount, icon: "PeopleFill"},
            ], }
            console.log(dash);
            res.status(200).json({ ...dash });
            
        } catch (err) {
            console.log(err);
            res.status(err.status).json(err);
        }
    }
);

export default router;