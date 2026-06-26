import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "DELETE"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`socket.io say: Client terhubung (id: ${socket.id})`);

        socket.on("disconnect", () => {
            console.log(`socket.io say: Client terputus (id: ${socket.id})`);
        });
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.IO belum diinisialisasi! Panggil initSocket() dulu di index.js");
    }
    return io;
}
