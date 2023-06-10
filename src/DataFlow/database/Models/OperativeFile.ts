import { Schema, model } from "mongoose";


const OperativeFile = new Schema({
    file_name: {type: String, unique: true, required: true},
    uid: {type: String, unique: true, required: true},
    exp_timestamp: {type: Number, required: true},
    session_id: {type: String, required: true}
})

const OperativeFileModel = model('operative_file', OperativeFile)

export default OperativeFileModel