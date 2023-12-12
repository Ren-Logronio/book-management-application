import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
    }, 
    description: {
        type: String,
    },
    datePublished: {
        type: Date,
    },
    keywords: {
        type: String,
    },
    bookType: {
        type: String,
        enum: ["digital", "print"],
    },
    bookCoverImageLocation: {
        type: String,
    },
    bookDocumentLocation: {
        type: String,
    },
},  {
    timestamps: true
});

export default mongoose.model("Book", BookSchema);