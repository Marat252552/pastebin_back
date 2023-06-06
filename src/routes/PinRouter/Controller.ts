import path from "path"
import PinModel from "../../database/Models/PinModel"
import { CreatePinReq_T, GetPinReq_T } from "./types"
import FileModel from "../../database/Models/FileModel"
import fs from 'fs'


class Controller {
    async createPin(req: CreatePinReq_T, res: any) {
        try {
            const {files_UIDs, text, session_id, title} = req.body
            if(!text || !title || title.length > 19 || !session_id || !files_UIDs) {
                return res.sendStatus(400)
            }

            let files = await FileModel.find({session_id})

            let images_names: string[] = []

            files.forEach(file => {
                let {uid} = file
                let new_file_name = uid + '.' + file.mimetype.split('/')[1]

                // checking whether this file exists
                if(!files_UIDs.find(el => el === uid)) return

                let newPath = path.resolve(__dirname, './../../', 'static', new_file_name)
                let oldPath = path.resolve(__dirname, './../../', 'operative', uid)
                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        console.log(err)
                    }
                    console.log('Successfully renamed - AKA moved!')
                })
                images_names.push(new_file_name)
            })

            let pin = await PinModel.create({images_names, text, title})

            let link = process.env.FRONT_URL + '/view/' + pin._id

            res.status(200).json({link})

        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getPin(req: GetPinReq_T, res: any) {
        try {
            let {_id} = req.params

            let pin = await PinModel.findOne({_id})
            if(!pin) return res.sendStatus(400)

            res.status(200).json({pin})

        } catch(e) {
            console.log(e)
        }
    }
}

export default new Controller()