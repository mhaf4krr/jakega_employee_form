const express = require("express")
const app = express()

let PORT = process.env.PORT || 4000

app.use(express.static("public"))

app.get("/*",(req,res)=>{
    res.send("Hello")
})

app.listen(PORT)