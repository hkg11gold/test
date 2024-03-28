
 npm i express dotenv bcrypt jsonwebtoken body-parser cors nodemon mongoose ejs@3.1.9 jquery
+ thêm đoạn này zo: (--   "start": "nodemon src/index.js"  --)
-------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <br class="container">
        <h1>Create</h1>
        <form id="add-sv">
            <!-- mssv: {type: String, required: true, unique: true},
        tensv: {type: String, required: true},
        ngaynhaphoc: {type: String, required: true},
        ngayratruong: {type: String, required: true},
        address: {type: String, required: true,} -->
            <input type="text" name="mssv" placeholder="mssv">
            <input type="text" name="tensv" placeholder="tensv">
            <input type="text" name="ngaynhaphoc" placeholder="ngaynhaphoc">
            <input type="text" name="ngayratruong" placeholder="ngayratruong">
            <input type="text" name="address" placeholder="address">
            <button type="submit">Create</button>
        </form>

        <h1>Delete</h1>
        <input type="text" id="deleteInput" placeholder="enter student code ">
        <button onclick="deleteMssv()">Delete</button>

        <h1>Search</h1>
        <input type="text" id="searchInput" placeholder="Enter student code">
        <button onclick="sreachMssv()">Sreach</button>

        <h1>Student info</h1>
        <table id="infoSv">
            <thead>
                <tr>

                    <th>mssv</th> 
                    <th>tensv</th>
                    <th>ngaynhaphoc</th>
                    <th>ngayratruong</th>
                    <th>address</th>

                </tr>
            </thead>
            <tbody id="info"></tbody>
        </table> </br>

        <h1>Update</h1>
        <form id="update">
            <input type="text" name="mssv" placeholder="mssv">
            <input type="text" name="tensv" placeholder="tensv">
            <input type="text" name="ngaynhaphoc" placeholder="ngaynhaphoc">
            <input type="text" name="ngayratruong" placeholder="ngayratruong">
            <input type="text" name="address" placeholder="address">
            <button type="submit">Update Info</button>
        </form>
    </div>
    <script src="/jquery/dist/jquery.min.js"></script>
    <script>
        $('#add-sv').submit(function(event){
            event.preventDefault();
            var formData = $(this).serialize();
            console.log('formData', formData)
            $.ajax({
                url:'/api/gk/create',
                method:'POST',
                data : formData,
                success: function(response) { 
                    alert('create success sv !!!');
                },
                error: function(xhr, status, error){
                    alert('fail !!')
                }
            })
        })

        function deleteMssv() {
            var mssv = $('#deleteInput').val()
            if(confirm('are you sure to delete')){
                $.ajax({
                    url:'/api/gk/delete/' + mssv,
                    method: 'DELETE',
                    success: function(response){
                        alert('delete  ok')
                    },
                    error: function(xhr, status, error) {
                        alert('fail')
                    }
                })
            }
        }

        function sreachMssv() {
            var mssv = $('#searchInput').val();
            $.ajax({
                url:'/api/gk/get/' + mssv,
                method:'GET',
                success: function(response){
                    $('#info').empty();
                    if(response){
                        $('#info').append(`
                            <tr>
                                <td>${response.mssv}</td>
                                <td>${response.tensv}</td>
                                <td>${response.ngaynhaphoc}</td>
                                <td>${response.ngayratruong}</td>
                                <td>${response.address}</td>
                            </tr>    
                        `)
                        $('#update input[name="mssv"], #update input[name="tensv"],#update input[name="ngaynhaphoc"],#update input[name="ngayratruong"],#update input[name="address"]').val(function(){
                            return response[this.name]
                        })
                    } else{
                        $('#update input[name="mssv"], #update input[name="tensv"],#update input[name="ngaynhaphoc"],#update input[name="ngayratruong"],#update input[name="address"]').val('');
                        $('#info').append(`<tr>
                            <td colspan="9"> ${response.message}</td>
                        </tr>`)
                    }
                },
                error: function(xhr, status, error){
                    $('#update input[name="mssv"], #update input[name="tensv"],#update input[name="ngaynhaphoc"],#update input[name="ngayratruong"],#update input[name="address"]').val('');
                    alert('fail')
                }
            })
        }

        $('#update').submit(function(event){
            var mssv = $('#searchInput').val();
            event.preventDefault();
            var formData = $(this).serialize()
            $.ajax({
                url:'/api/gk/update/' + mssv,
                method: 'PUT',
                data: formData,
                success: function(response){
                    alert('ok')
                },
                error: function(xhr, status, error){
                    alert('fail')
                }
            })
        })

    </script>
    
</body>
</html>


--------------------------------------------------------

const model = require("../models/model")
//     mssv: 
//     tensv: 
//     ngaynhaphoc: 
//     ngayratruong: 
//     address:
const create = async(req, res) => {
    try{
        const {mssv, tensv, ngaynhaphoc,ngayratruong,address } = req.body
        const response = await model.create({mssv, tensv, ngaynhaphoc,ngayratruong,address})
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({
            message: e
        })
    }
}
const get = async (req, res) => {
    try{
        const mssv= req.params.mssv
        const response = await model.findOne({mssv:mssv})
        return res.status(200).json(response)
    } catch(e) {
        return res.status(500).json({
            message: e
        })
    }
}

const update = async(req, res) => {
    try{
        const mssv = req.params.mssv
        const data = req.body
        const response = await model.findOneAndUpdate({mssv:mssv},data, {new: true})
        return res.status(200).json(response)
    } catch(e){
        return res.status(500).json({
            message: e
        })
    }
}

const deletee = async(req, res)=> {
    try{
        const mssv= req.params.mssv
        const response = await model.deleteOne({mssv})
        return res.status(200).json(response)
    } catch(e){
        return res.status(500).json({
            message: e
        })
    }
}


module.exports= {
    create,
    get,
    update,
    deletee,
}


--------------------------------------------------------


const  mongoose  = require("mongoose");

const GKSchema = new mongoose.Schema({
        mssv: {type: String, required: true, unique: true},
        tensv: {type: String, required: true},
        ngaynhaphoc: {type: String, required: true},
        ngayratruong: {type: String, required: true},
        address: {type: String, required: true,}
    },
    {
        timestamps:true
    }
)
// const Thimodel = mongoose.model("thimodel"(tên bản ở đây), GKSchema);
const Thimodel = mongoose.model("thimodel", GKSchema);
module.exports = Thimodel


------------------------------------------

const express = require('express')
const router = express.Router()
const controller = require("../controller/controller")


router.post('/create', controller.create)
router.get('/get/:mssv', controller.get)
router.put('/update/:mssv', controller.update)
router.delete('/delete/:mssv', controller.deletee)

module.exports= router



-------------------------------------------------

const router = require("./router")

const routes = (app) => {
    app.use('/api/gk', router)
}

module.exports= routes;


-----------------------------------------------

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
