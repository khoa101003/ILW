import express from "express"
import cors from "cors"
import madk from "./api/winter.route.js"

const app = express()

app.use(cors())
app.use(express.json())

//app.use("/api", (req, res) => res.status(404).json({error: "hahahaha"}))
app.use("/api/v1/madk", madk)
app.use("*", (req, res) => res.status(404).json({error: "not found hahaha"}))

export default app