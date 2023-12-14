import express from "express";
import Book from "../models/Book.js";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

var router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, '../public/uploads/')});
const pdfDir = path.join(__dirname, '../public/uploads/pdf');
const imgDir = path.join(__dirname, '../public/uploads/img');

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
    "/search/:query",
    async (req, res) => {
        try {
            var books;
            if (req.params.query != "@all"){
                const regex = new RegExp(req.params.query, 'i');
                books = await Book.find({
                    $or: [
                        { title: { $regex: regex } },
                        { keywords: { $in: [regex] } },
                    ],
                });
            } else {
                books = await Book.find();
            }
            res.status(200).json(books);
        } catch (err) {
            console.log("[GET] Book search - Failed - " + err);
            res.status(err.status).json(err);
        }
    });

router.post(
    "/add", upload.any(),
    async (req, res) => {
        try {
            console.log("Adding");
            console.log(req.body);
            var bookCoverImage = "";
            var bookDocument = "";
            req.files.forEach(file => {
                console.log(file);
                // move file to pdfDir or imgDir with appropriate formats
                if(file.mimetype == "application/pdf" ) {
                    if (req.body.bookType == "digital") {
                        bookDocument = file.filename + ".pdf";
                        const rnPath = path.join(pdfDir, bookDocument);
                        fs.renameSync(file.path, rnPath);
                    } else {
                        // delete the file
                        fs.unlinkSync(file.path);
                    }
                } else if (
                    file.mimetype == "image/png" ||
                    file.mimetype == "image/jpg" ||
                    file.mimetype == "image/jpeg"
                ) {
                    bookCoverImage = file.filename + path.extname(file.originalname);
                    const rnPath = path.join(imgDir, bookCoverImage);
                    fs.renameSync(file.path, rnPath);
                }
            });
            const book = new Book({
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                datePublished: req.body.datePublished,
                keywords: req.body.keywords,
                bookType: req.body.bookType,
                bookCoverImage: bookCoverImage,
                bookDocument: bookDocument,
            });
            const newbook = await book.save();
            res.status(200).send(newbook);
        } catch (err) {
            console.log("[POST] Add Book - Failed - " + err);
            res.status(err.status).json(err);
        }
    });

router.put(
    "/edit", upload.any(),
    async (req, res) => {
        try {
            console.log(req.body);
            var bookCoverImage, bookDocument;
            req.files.forEach(
                file => {
                    console.log(file);
                    // move file to pdfDir or imgDir with appropriate formats
                    if(file.mimetype == "application/pdf" ) {
                        if (req.body.bookType == "digital") {
                            bookDocument = file.filename + ".pdf";
                            const rnPath = path.join(pdfDir, bookDocument);
                            const oldPdfPath = path.join(pdfDir, req.body.bookDocumentFn);
                            fs.renameSync(file.path, rnPath);
                            if (req.body.bookDocumentFn) fs.unlinkSync(oldPdfPath);
                        } else {
                            fs.unlinkSync(file.path);
                        }
                    } else if (
                        file.mimetype == "image/png" ||
                        file.mimetype == "image/jpg" ||
                        file.mimetype == "image/jpeg"
                    ) {
                        bookCoverImage = file.filename + path.extname(file.originalname);
                        const rnPath = path.join(imgDir, bookCoverImage);
                        const oldImgPath = path.join(imgDir, req.body.bookCoverImageFn);
                        fs.renameSync(file.path, rnPath);
                        if (req.body.bookCoverImageFn) fs.unlinkSync(oldImgPath);
                    } else {
                        fs.unlinkSync(file.path);
                    }
                }
            );
            await Book.findByIdAndUpdate(req.body.id, {
                $set: { ...req.body, bookCoverImage: bookCoverImage || req.body.bodyCoverImageFn, bookDocument: bookDocument || req.bookDocumentFn },
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