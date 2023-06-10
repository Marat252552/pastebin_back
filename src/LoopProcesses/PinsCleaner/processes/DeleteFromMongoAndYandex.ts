import PinModel from "../../../DataFlow/mongo_database/Models/PinModel"
import { DeleteFile } from "../../../DataFlow/yandex_cloud/Actions"
import { Pin_T } from "../../../shared/types"



const DeleteFromMongoAndYandex = (pins: Pin_T[]) => {
    return new Promise(async (resolve, reject) => {
        try {
            for await (const pin of pins) {
                let images = pin.images
                for await (const image of images) {
                    await DeleteFile(image.key)
                }
                await PinModel.deleteOne({_id: pin._id})
            }
            resolve(null)
        } catch(e) {
            console.log(e)
            console.log('DeleteFromMongoAndYandex error')
            reject()
        }
        
    })
}

export default DeleteFromMongoAndYandex