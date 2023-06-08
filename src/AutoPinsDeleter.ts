import PinModel from "./database/Models/PinModel"
import { Pin_T } from "./shared/types"
import { DeleteFile } from "./yandex_files/Actions"



const AutoPinsDeleter = () => {
    setInterval(async () => {
        try {
            let pins = await PinModel.findExpired()
            for await (const pin of pins) {
                let images = pin.images
                for await (const image of images) {
                    await DeleteFile(image.key)
                }
                
                await PinModel.deleteOne({_id: pin._id})
            }

            let disposed_pins = await PinModel.findDisposed()
            for await (const disposed_pin of disposed_pins) {
                disposed_pin
                let images = disposed_pin.images
                for await (const image of images) {
                    await DeleteFile(image.key)
                }
                
                await PinModel.deleteOne({_id: disposed_pin._id})
            }

        } catch(e) {
            console.log(e)
        }
    }, 20000)
}

export default AutoPinsDeleter