import { Schema, model, } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    createdOn: { type: Date, default:new Date().getTime() }
});

UserSchema.pre("save", async function (next) {           //การเข้ารหัส ให้มันยากขึ้น ไว้เก็บรหัสผ่านของผู้ใช้ให้แปลงเป็นรหัสที่ยากขึ้น เจ้าของเว็บดูไม่รู้
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

export const User = model("User", UserSchema);