
import cors from "cors";
import bodyParser from "body-parser";
import e from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import get from "./Routes/get.js"
import post from "./Routes/post.js"
import seasion from "./middleware/SeasionMiddleware.js"
import helmet from "helmet";
import mail from './config/mailservice.js'
import send from "./middleware/logInput.js";
import jwt from "jsonwebtoken"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = e()
const port = 3000
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(e.static(join(__dirname, "public")))
app.use(seasion)
app.use("/get",get)
app.use("/post", post)


app.listen(port, ()=>{
        console.log("nyala silahkan kunjungi http://localhost:"+port);
            
})