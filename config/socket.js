import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserById } from "../models/userModel.js";
import { getAksesLabRole } from "../middleware/rbacMiddleware.js";

dotenv.config()
const SECRET = process.env.SECRET

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "DELETE"]
        }
    });

    io.use(async (socket, next) => {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1]

        if (!token) {
            return next(new Error("Token wajib diisi"))
        }

        try {
            const decoded = jwt.verify(token, SECRET)
            const user = await findUserById(decoded.id)

            if (!user) {
                return next(new Error("User tidak ditemukan"))
            }

            socket.user = user
            next()
        } catch (error) {
            next(new Error("Token tidak valid"))
        }
    })

    io.on("connection", (socket) => {
        socket.join(socket.user.role)
        console.log(`socket.io say: Client terhubung (id: ${socket.id}, role: ${socket.user.role})`);

        socket.on("disconnect", () => {
            console.log(`socket.io say: Client terputus (id: ${socket.id})`);
        });
    });

    return io;
}

export function emitByLab(event, data) {
    if (!io) {
        throw new Error("Socket.IO belum diinisialisasi! Panggil initSocket() dulu di index.js")
    }

    io.to("admin").emit(event, data)

    for (const role of ["yusuf", "ahmad", "ade"]) {
        const labIds = getAksesLabRole(role)
        const dataTerfilter = Array.isArray(data)
            ? data.filter(item => labIds.includes(Number(item.id_lab || item.lab_id)))
            : data

        io.to(role).emit(event, dataTerfilter)
    }
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.IO belum diinisialisasi! Panggil initSocket() dulu di index.js");
    }
    return io;
}
