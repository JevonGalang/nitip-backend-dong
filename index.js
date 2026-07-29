
import cors from "cors";
import bodyParser from "body-parser";
import e from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createServer } from "http";
import { initSocket } from "./config/socket.js";
import get from "./Routes/get.js"
import post from "./Routes/post.js"
import hapusRouter from "./Routes/delete.js"
import seasion from "./middleware/SeasionMiddleware.js"
import helmet from "helmet";
import mail from './config/mailservice.js'
import send from "./middleware/logInput.js";
import jwt from "jsonwebtoken"
import rateLimit from "express-rate-limit";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = e()
const server = createServer(app)
const io = initSocket(server)
const port = 3000
app.use(helmet())
app.use(e.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
app.use(e.static(join(__dirname, "public")))
app.use(seasion)

app.use("/get",get)
app.use("/post", post)
app.use("/delete", hapusRouter)


server.listen(port, ()=>{
        console.log("nyala silahkan kunjungi http://localhost:"+port);
        console.log("socket.io say: WebSocket server siap menerima koneksi");
            
})
