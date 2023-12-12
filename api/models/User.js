import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    // 
    firstname: {
        type: String,
        require: true,
    },
    middlename: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    mobileNumber: {
        type: Number,
        require: true
    },
    photo: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        require: true,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 255
    },
    userType: {
        type: String,
        enum: ["student", "librarian"],
        default: "student"
    },
},
    {
        timestamps: true
    });

export default mongoose.model('User', UserSchema);