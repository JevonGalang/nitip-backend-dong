import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { findUserById } from "../models/userModel.js"
dotenv.config()
const SECRET = process.env.SECRET

const response = async (req,res,next) => {
     const veriv = req.headers.authorization

    
     if(!veriv){
        return res.status(401).json({
            pesan:"username not exit"
        })
     }

        const token =
        veriv.split(" ")[1];

    try {

        const decoded =
            jwt.verify(
                token,
                SECRET
            );

        const user = await findUserById(decoded.id)
        if (!user) {
            return res.status(401).json({
                pesan: "User tidak ditemukan"
            })
        }

        req.user = user;

        next();

    } catch (err) {

        return res.status(403).json({
            message: "Token tidak valid"
        });

    }
}
     
export default response
