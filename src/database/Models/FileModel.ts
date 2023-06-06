import { Schema, model } from "mongoose";



const File = new Schema({
    uid: {type: String, unique: true, required: true},
    mimetype: {type: String, required: true},
    exp_timestamp: {type: Number, required: true},
    session_id: {type: String, required: true}
})

const FileModel = model('file', File)

export default FileModel