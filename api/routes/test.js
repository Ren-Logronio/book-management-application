import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import schema from "gridfile";
import { fileURLToPath } from 'url';

const GridFile = mongoose.model('test', schema);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, '../public/uploads/')});

var router = express.Router();

const fileFormSubmissionTest = async (req, res) => {

    console.log("File form submission test");
    console.log(req.body.text);
    console.log(req.files);
    console.log(req.files[0]);
    try{
        const fileStream = fs.createReadStream(req.files[0].path);
        const gridFile = new GridFile({ filename: req.files[0].originalFilename });
        await gridFile.upload(fileStream);
        fs.unlinkSync(req.files[0].path);
    } catch (err) {
        console.log(err);
    }
    res.status(200).json({message: "File form submission test"});

}

router.post('/do', upload.any(), fileFormSubmissionTest);

export default router;