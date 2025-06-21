import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyChmTydP1kRJ85rcoREsHiwXzzyQi6RZNs" });
import express from "express"

import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.post("/" , async (req , res  ) => {
    try {
        const body = req.body
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: body.question,
        });
        console.log(response)
        res.json(response);     
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            message : "too many questions"
        })
    }
})

app.listen(3000 , () => {
    console.log("server is runnig")
})

