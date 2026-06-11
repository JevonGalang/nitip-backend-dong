
import logbook from "../services/logbook.js"
import { response } from "../helpers/response.js";
const say = "iniPost say: "



export const post = async (req, res) => {
  try {
    const hasil = await logbook(req);
    response(hasil, 200, res);
  } catch (error) {
    console.error("Error in post:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

