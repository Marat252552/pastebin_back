import PinModel from "../../DataFlow/mongo_database/Models/PinModel"
import { CreatePinReq_T, GetPinReq_T } from "./types"
import OperativeFileModel from "../../DataFlow/mongo_database/Models/OperativeFileModel"
import { DeleteFile, UploadImage } from "../../DataFlow/yandex_cloud/Actions"
import { UploadFile_T } from "../../shared/types"
import { TWENTY_FOUR_HOURS } from "../../shared/TimePeriods"
import verifyCaptchaAPI from "../../shared/VerifyCaptchaAPI"


class Controller {
    async createPin(req: CreatePinReq_T, res: any) {
        try {
            const { captcha, files_UIDs, text, session_id, title, one_read, days_alive = 100 } = req.body
            if (!text || !captcha|| !title || title.length > 20 || text.length > 200 || !session_id || days_alive > 100) {
                return res.sendStatus(400)
            }
            console.log('session_id create pin', session_id)
            console.log(files_UIDs)
            let data = await verifyCaptchaAPI(captcha)
            if(!data.success) {
                return res.sendStatus(400)
            }

            let files = await OperativeFileModel.find({ session_id })

            let images = []

            console.log(files)
            if (files[0]) {
                for await (const file of files) {
                    let { file_name, uid } = file

                    // checking whether this file is required to be added
                    if (files_UIDs.find(el => el === uid)) {
                        let { key, Location }: UploadFile_T = await UploadImage(file_name)

                        let image = { file_name, key, link: Location }

                        images.push(image)
                    }
                }
            }

            let days_in_timestamp_format = days_alive * TWENTY_FOUR_HOURS
            let expiresAt = Date.now() + days_in_timestamp_format

            let pin = await PinModel.create({ images, text, title, one_read, expiresAt })

            res.status(200).json({
                pin_id: pin._id
            })

        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getPin(req: GetPinReq_T, res: any) {
        try {
            let { _id } = req.params

            let pin = await PinModel.findOne({ _id })
            if (!pin) return res.sendStatus(404)

            if (pin.one_read && pin.views >= 1) {
                await PinModel.deleteOne({ _id })

                for await (const image of pin.images) {
                    await DeleteFile(image.key)
                }

                res.sendStatus(404)
            } else {
                await PinModel.addView(_id)
                res.status(200).json({ pin })
            }

        } catch (e) {
            console.log(e)
            res.sendStatus(404)
        }
    }
}

export default new Controller()