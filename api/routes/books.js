import express from "express";
import Book from "../models/Book.js";

var router = express.Router();

router.get(
    "/all",
    async (req, res) => {
        try {
        const books = await Book.find();
        console.log("[GET] All Books");
        res.status(200).send(books);
        } catch (err) {
        console.log("[GET] All Books - Failed - " + err);
        res.status(err.status).json(err);
        }
    });

router.get(
    "/:id",
    async (req, res) => {
        try {
        const book = await Book.findById(req.params.id);
        console.log("[GET] Book by id - " + req.params.id);
        res.status(200).send(book);
        } catch (err) {
        console.log("[GET] Book by id - Failed - " + err);
        res.status(err.status).json(err);
        }
    });


router.get(
    "/search",
    async (req, res) => {
        try {
            const books = await Book.find({title: {$regex: req.query.title, $options: 'i'}});
            console.log("[GET] Book search - " + req.query.title);
            res.status(200).send(books);
        } catch (err) {
            console.log("[GET] Book search - Failed - " + err);
            res.status(err.status).json(err);
        }
    });

router.get(
    "/keywords/",
    async (req, res) => {
        try {
            const books = await Book.find({keywords: {$regex: req.query.keywords, $options: 'i'}});
            console.log("[GET] Book search - " + req.query.keywords);
            res.status(200).send(books);
        } catch (err) {
            console.log("[GET] Book search - Failed - " + err);
            res.status(err.status).json(err);
        }
    });

router.post(
    "/add",
    async (req, res) => {
        try {
            const book = new Book({
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                datePublished: req.body.datePublished,
                keywords: req.body.keywords,
                bookType: req.body.bookType,
                bookCoverImageLocation: req.body.bookCoverImageLocation,
                bookDocumentLocation: req.bookDocumentLocation,
            });
            const newbook = await book.save();
            console.log("[POST] Add Book - " + req.body.title);
            res.status(200).send(newbook);
        } catch (err) {
            console.log("[POST] Add Book - Failed - " + err);
            res.status(err.status).json(err);
        }
    });

router.put(
    "/edit",
    async (req, res) => {
        try {
            await Book.findByIdAndUpdate(req.body.id, {
                $set: req.body,
            });
            console.log("[PUT] Edit Book - " + req.body.title);
            res.status(200).json("Book Updated");
        } catch (err) {
            console.log("[PUT] Edit Book - Failed - " + err);
            res.status(err.status).json(err);
        }
    });

router.delete(
    "/delete/:id",
    async (req, res) => {
        try {
            await Book.findByIdAndDelete(req.params.id);
            console.log("[DELETE] Delete Book - " + req.params.id);
            res.status(200).json("Book Deleted");
        } catch (err) {
            console.log("[DELETE] Delete Book - Failed - " + err);
            res.status(err.status).json(err);
        }
    });


export default router;