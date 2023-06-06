import { Schema, model } from "mongoose";



const Pin = new Schema({
    text: {type: String, required: true, length: 200},
    title: {type: String, required: true, length: 20},
    images_names: [{type: String}]
})

const PinModel = model('pin', Pin)

export default PinModel