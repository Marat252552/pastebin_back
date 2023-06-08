import { HydratedDocument, Model, Schema, model } from "mongoose";

interface Image_T {
    _id: string,
    file_name: string,
    key: string,
    link: string
}

interface ImageModel_T extends Model<Image_T> {}

const Image = new Schema<Image_T, ImageModel_T>({
    file_name: {type: String, required: true},
    key: {type: String, required: true},
    link: {type: String, required: true}
})



interface Pin_T {
    _id: string,
    title: string,
    images: Image_T[],
    text: string,
    one_read: boolean,
    createdAt: Date,
    views: number
}

interface PinModel_T extends Model<Pin_T> {
    findExpired(): Promise<HydratedDocument<Pin_T>[]>,
    addView(_id: string): Promise<void>,
    findDisposed(): Promise<HydratedDocument<Pin_T>[]>,
}

const Pin = new Schema<Pin_T, PinModel_T>({
    text: {type: String, required: true, maxLength: 200},
    title: {type: String, required: true, maxLength: 20},
    images: [Image],
    one_read: {type: Boolean, default: false},
    createdAt: {type: Date, default: () => Date.now()},
    views: {type: Number, default: 0}
})

let TWENTY_FOUR_HOURS = 86400000
let TEN_MINUTES = 600000

Pin.statics.findExpired = function() {
    let getCurrentDate = () => {
        return Date.now()
    }
    return this.where('createdAt').lt(getCurrentDate() - TWENTY_FOUR_HOURS)
}

Pin.statics.addView = function(_id: string) {
    return this.updateOne({_id}, {$inc : {'views' : 1}})
}
// Find those pins that are created for one read only and already been watched at least 1 time
Pin.statics.findDisposed = function(_id: string) {
    return this.where('one_read').equals(true).where('views').gt(0)
}

const PinModel = model<Pin_T, PinModel_T>('pin', Pin)

export default PinModel