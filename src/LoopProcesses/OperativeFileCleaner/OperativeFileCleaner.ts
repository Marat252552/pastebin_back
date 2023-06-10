import OperativeFileModel from '../../DataFlow/mongo_database/Models/OperativeFileModel'
import { TEN_MINUTES, TEN_SECONDS } from "../../shared/TimePeriods"
import DeleteFileFromOperativeFolder from './processes/DeleteFileFromOperativeFolder'
import DeleteFileFromMongoDatabaseById from './processes/DeleteFileFromMongoDatabaseById'

const OperativeFilesCleaner = () => {
    setInterval(async () => {
        try {
            let files = await OperativeFileModel.find()
            if (!files) return
            files.forEach(async (file) => {
                let { _id, expiresAt, file_name } = file
                if (+expiresAt <= Date.now()) {

                    await DeleteFileFromOperativeFolder(file_name)

                    await DeleteFileFromMongoDatabaseById(_id.toString())

                }
            })
        } catch (e) {
            console.log(e)
        }

    }, TEN_MINUTES)
}

export default OperativeFilesCleaner