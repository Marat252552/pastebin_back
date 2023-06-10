import OperativeFileModel from "../DataFlow/database/Models/OperativeFile"
import fs from 'fs'
import GetPathToOperativeFolder from "../shared/GetPathToOperative"
import { TEN_MINUTES } from "../shared/TimePeriods"

const OperativeFilesChecker = () => {
    setInterval(async () => {
        try {
            let files = await OperativeFileModel.find()
            if (!files) return
            files.forEach(async (file) => {
                let { _id, exp_timestamp, file_name } = file
                if (exp_timestamp <= Date.now()) {

                    fs.unlink(GetPathToOperativeFolder() + file_name, async (err) => {
                        if (err) {
                            console.log('error while deleting from operative')
                            console.log(err)
                        } else {
                            try {
                                await OperativeFileModel.deleteOne({ _id })
                                console.log('operative file deleted successfully')
                            } catch(e) {
                                console.log(e)
                            }
                        }
                    });
                }
            })
        } catch (e) {
            console.log(e)
        }

    }, TEN_MINUTES)
}

export default OperativeFilesChecker