import mongoose from "mongoose";
import bcrypt from "bcryptjs";
mongoose.connect("mongodb://127.0.0.1:27017/vaidikpooja");
import User from "./backend/models/User.js";

async function t() {
  const user = await User.findOne({email: "we225674@navgurukul.org"});
  console.log("User:", user);
  process.exit(0);
}
t();
