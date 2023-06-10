import PinModel from "../../DataFlow/mongo_database/Models/PinModel"
import { DeleteFile } from "../../DataFlow/yandex_cloud/Actions"
import { TEN_MINUTES, TEN_SECONDS } from "../../shared/TimePeriods"
import { Pin_T } from "../../shared/types"
import DeleteFromMongoAndYandex from "./processes/DeleteFromMongoAndYandex"


// Searches for expired and disposed pins and deletes them from mongo_database 
// and their corresponding files in yandex_cloud
const PinsCleaner = () => {
    setInterval(async () => {
        try {
            // Pins that have expiresAt value lower than Date.now()
            let expired_pins: Pin_T[] = await PinModel.findExpired() as any
            await DeleteFromMongoAndYandex(expired_pins)

            // Pins that have one_read true equal and views more than 1
            let disposed_pins: Pin_T[] = await PinModel.findDisposed() as any
            await DeleteFromMongoAndYandex(disposed_pins)

        } catch (e) {
            console.log('AutoPinsDeleter Error')
            console.log(e)
        }
    }, TEN_MINUTES)
}

export default PinsCleaner