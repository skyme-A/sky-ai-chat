import express from "express";
import cors from "cors";
import { answerEngine } from "./brain/answer.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SKY backend running");
});

app.post("/chat", (req, res) => {
    const { message } = req.body;

    const reply = answerEngine(message);

    res.json({
        reply,
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`SKY backend running on port ${PORT}`);
});