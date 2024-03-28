const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const routes = require("./routes")

const cors = require("cors")
const bodyParser = require("body-parser")

dotenv.config()

const app = express()
const port = process.env.PORT || 9000

app.set("view engine", "ejs")
app.set("views", "./views")
app.get('/', (req, res)=> {
    res.render('index')
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

routes(app)

mongoose.connect(`${process.env.MONGO_DB}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connect ok mongo')
    })
    .catch((err)=> {
        console.log("fail", err)
    })

app.listen(port, ()=>{
    console.log('server is run: ', port)
})

module.exports=app