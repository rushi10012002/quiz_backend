import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import router from "./Router/route.js"
import connect from "./database/conn.js"

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
config()

app.use('/api', router)

app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`SERVER CONNECTED TO http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Cannot connect to a server")
    }
})

