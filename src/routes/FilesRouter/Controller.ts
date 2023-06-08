import path from "path"
import FileModel from "../../database/Models/OperativeFile"
import { UploadFileReq_T } from "./types"


class Controller {
    async uploadFile(req: UploadFileReq_T, res: any) {
        try {
            let { file } = req.files
            let { session_id, uid } = req.body

            if (file.size > 2000000) {
                return res.status(413).json({ message: 'Размер файла не может быть больше 2х Мбайт' })
            }

            let ONE_HOUR = 3600000
            let THIRTY_SECONDS = 30000
            let TEN_MINUTES = 600000
            let TEN_SECONDS = 10000

            // Time in future when this file should be auto deleted if not used
            let exp_timestamp = Date.now() + ONE_HOUR

            let file_name = uid + '.' + file.mimetype.split('/')[1]

            await FileModel.create({
                file_name, exp_timestamp, session_id, uid
            })

            file.mv(path.resolve(__dirname, './../../', 'operative', file_name))

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()