import path from "path"
import FileModel from "../../database/Models/FileModel"
import { UploadFileReq_T } from "./types"


class Controller {
    async uploadFile(req: UploadFileReq_T, res: any) {
        try {
            let { file } = req.files
            let {session_id, uid} = req.body
            let mimetype = file.mimetype

            // let image_type = mimetype.split('/')[1]
            
            if (file.size > 2000000) {
                return res.status(413).json({ message: 'Размер файла не может быть больше 2х Мбайт' })
            }

            let ONE_HOUR = 3600000
            let THIRTY_SECONDS = 30000
            let TEN_MINUTES = 600000
            let TEN_SECONDS = 10000

            // Time in future when this file should be auto deleted if not used
            let exp_timestamp = Date.now() + ONE_HOUR

            await FileModel.create({
                uid, mimetype, exp_timestamp, session_id
            })

            file.mv(path.resolve(__dirname, './../../', 'operative', uid))
            

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()