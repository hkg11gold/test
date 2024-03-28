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