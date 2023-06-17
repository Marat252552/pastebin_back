import OperativeFileModel from "../../DataFlow/mongo_database/Models/OperativeFileModel"
import { UploadFileReq_T } from "./types"
import { v4 } from "uuid"
import GetPathToOperativeFolder from "../../shared/GetPathToOperative"
import { ONE_HOUR, TEN_MINUTES, TEN_SECONDS } from "../../shared/TimePeriods"

const FOUR_MEGABYTES = 4000000

class Controller {
    async uploadFile(req: UploadFileReq_T, res: any) {
        try {
            let { file } = req.files
            let { session_id, uid } = req.body
            if(!session_id || !uid || !file) return res.sendStatus(400)

            if (file.size > FOUR_MEGABYTES) {
                return res.status(413).json({ message: 'Размер файла не может быть больше 4х Мбайт' })
            }

            // Time in future when this file should be auto deleted if not used
            let expiresAt = Date.now() + ONE_HOUR

            let file_name = v4() + '.' + file.mimetype.split('/')[1]

            await OperativeFileModel.create({
                file_name, expiresAt, session_id, uid
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