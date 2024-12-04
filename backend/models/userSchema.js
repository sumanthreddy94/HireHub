import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minLength: [3, "Name must contain at least 3 charactes"],
    maxLength: [30, "Name cannot exceed 30 charactes"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [8, "Password must contain at least 3 charactes"],
    maxLength: [32, "Password cannot exceed 32 charactes"],
    select: false
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employer", "Admin"]
  },
  createdAt: {
      type: Date,
      default: Date.now,
  }
});

//Hashing the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Comparing password
userSchema.methods.comparePassword = async function(enteredPasword){
  return await bcrypt.compare(enteredPasword, this.password)
}

//Generating a JWT token for authorization
userSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d' // Hardcoded expiration time
  });
};


export const User = mongoose.model("User", userSchema)