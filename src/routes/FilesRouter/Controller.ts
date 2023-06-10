import path from "path"
import OperativeFileModel from "../../DataFlow/database/Models/OperativeFile"
import { UploadFileReq_T } from "./types"
import { v4 } from "uuid"
import GetPathToOperativeFolder from "../../shared/GetPathToOperative"
import { TEN_SECONDS } from "../../shared/TimePeriods"


class Controller {
    async uploadFile(req: UploadFileReq_T, res: any) {
        try {
            let { file } = req.files
            let { session_id, uid } = req.body

            if (file.size > 2000000) {
                return res.status(413).json({ message: 'Размер файла не может быть больше 2х Мбайт' })
            }

            // Time in future when this file should be auto deleted if not used
            let exp_timestamp = Date.now() + TEN_SECONDS

            let file_name = v4() + '.' + file.mimetype.split('/')[1]

            await OperativeFileModel.create({
                file_name, exp_timestamp, session_id, uid
            })

            file.mv(GetPathToOperativeFolder() + file_name)

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()