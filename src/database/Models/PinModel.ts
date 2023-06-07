import { Schema, model } from "mongoose";



const Pin = new Schema({
    text: {type: String, required: true, length: 200},
    title: {type: String, required: true, length: 20},
    images_links: [{type: String}],
    one_read: {type: Boolean, default: false}
})

const PinModel = model('pin', Pin)

export default PinModel