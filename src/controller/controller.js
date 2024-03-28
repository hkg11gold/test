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