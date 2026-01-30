import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    avatarUrl: {
        type: String //url hien thi hinh anh
    },
    avatarId: {
        type: String //cloudinary
    },
    bio: {
        type: String, //
        maxlength: 500
    },
    phone: {
        type: String,
        sparse: true, //duoc null nhung khong duoc trung nhau
    }
},
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema)
export default User