import path from "path"
import PinModel from "../../database/Models/PinModel"
import { CreatePinReq_T, GetPinReq_T } from "./types"
import FileModel from "../../database/Models/FileModel"
import fs from 'fs'
import { UploadImage } from "../../yandex_files/Actions"
import { UploadFile_T } from "../../shared/types"


class Controller {
    async createPin(req: CreatePinReq_T, res: any) {
        try {
            const {files_UIDs, text, session_id, title, one_read} = req.body
            if(!text || !title || title.length > 20 || text.length > 200 || !session_id) {
                return res.sendStatus(400)
            }

            let files = await FileModel.find({session_id})

            let images_links: string[] = []

            if(files[0]) {
                for await(const file of files) {
                    let {file_name, uid} = file
    
                    // checking whether this file exists
                    if(files_UIDs.find(el => el === uid)) {
                        let uploadInfo: UploadFile_T = await UploadImage(file_name)

                        images_links.push(uploadInfo.Location)
                    }
                }
            }          

            let pin = await PinModel.create({images_links, text, title, one_read})

            let link = process.env.FRONT_URL + '/view/' + pin._id

            res.status(200).json({link, pin_id: pin._id})

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

            if(pin.one_read) {
                await PinModel.deleteOne({_id})
                // pin.images_names.forEach(image_name => {
                //     fs.unlink(path.resolve(__dirname, './../../', 'static', image_name!), (err) => {
                //         if (err) {
                //             console.log(err)
                //         } else {
                //             console.log("Delete File successfully.");
                //         }
                //     });
                // })
            }
            

            res.status(200).json({pin})

        } catch(e) {
            console.log(e)
            res.sendStatus(404)
        }
    }
}

export default new Controller()