const express = require('express')
const router = express.Router()
const controller = require("../controller/controller")


router.post('/create', controller.create)
router.get('/get/:mssv', controller.get)
router.put('/update/:mssv', controller.update)
router.delete('/delete/:mssv', controller.deletee)

module.exports= router