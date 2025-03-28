import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: [6, "Password must be at least 6 characters long"]
    },

    cartItems: [
        {
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
        }}
    ],

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

}, { timestamps: true });




// hashing the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch (error) {
        next(error);
    }
})

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}








const User = mongoose.model("User", userSchema);
export default User; 

