import PinModel from "../../DataFlow/database/Models/PinModel"
import { CreatePinReq_T, GetPinReq_T } from "./types"
import OperativeFileModel from "../../DataFlow/database/Models/OperativeFile"
import { DeleteFile, UploadImage } from "../../DataFlow/yandex_files/Actions"
import { UploadFile_T } from "../../shared/types"


class Controller {
    async createPin(req: CreatePinReq_T, res: any) {
        try {
            const {files_UIDs, text, session_id, title, one_read} = req.body
            if(!text || !title || title.length > 20 || text.length > 200 || !session_id) {
                return res.sendStatus(400)
            }

            let files = await OperativeFileModel.find({session_id})

            let images = []

            if(files[0]) {
                for await(const file of files) {
                    let {file_name, uid} = file
    
                    // checking whether this file is required to be added
                    if(files_UIDs.find(el => el === uid)) {
                        let {key, Location}: UploadFile_T = await UploadImage(file_name)

                        let image = {file_name, key, link: Location}

                        images.push(image)
                    }
                }
            }          

            let pin = await PinModel.create({images, text, title, one_read})

            // let link = process.env.FRONT_URL + '/view/' + pin._id

            res.status(200).json({
                // link,
                 pin_id: pin._id
                })

        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getPin(req: GetPinReq_T, res: any) {
        try {
            let {_id} = req.params

            let pin = await PinModel.findOne({_id})

            if(!pin) return res.sendStatus(404)


            if(pin.one_read && pin.views >= 1) {
                await PinModel.deleteOne({_id})
                
                for await(const image of pin.images) {
                    await DeleteFile(image.key)
                }

                res.sendStatus(404)
            } else {
                await PinModel.addView(_id)
                res.status(200).json({pin})
            }

        } catch(e) {
            console.log(e)
            res.sendStatus(404)
        }
    }
}

export default new Controller()