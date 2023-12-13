import express from "express";
import { fileURLToPath } from "url";
import path from "path";

var router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pdfDir = path.join(__dirname, '../public/uploads/pdf');
const imgDir = path.join(__dirname, '../public/uploads/img');

router.get("/img/:img", async (req, res) => {
    try {
        const img = req.params.img;
        console.log("[GET] Image - " + img);
        res.sendFile(path.join(imgDir, img));
    } catch (err) {
        console.log("[GET] Image - Failed - " + err);
        res.status(err.status).json(err);
    }
});

router.get("/pdf/:pdf", async (req, res) => {
    try {
        const pdf = req.params.pdf;
        console.log("[GET] PDF - " + pdf);
        res.sendFile(path.join(pdfDir, pdf));
    } catch (err) {
        console.log("[GET] PDF - Failed - " + err);
        res.status(err.status).json(err);
    }
});

export default router;