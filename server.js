const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const logger = require("morgan")


app.use(logger("dev"))
app.use(bodyParser.json())


app.use("/api/envelopes", require("./routes/envelopes"))
app.get("/", (req, res) => {
    res.send("Hello, World")
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server is running successfully"))