import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    review: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        require: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, {
    timestamps: true
});

export default mongoose.model('Review', ReviewSchema);