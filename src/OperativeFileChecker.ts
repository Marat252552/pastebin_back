import path from "path"
import FileModel from "./database/Models/FileModel"
import fs from 'fs'

let TEN_MINUTES = 600000
let TEN_SECONDS = 10000

const OperativeFilesChecker = () => {
    setInterval(async () => {
        try {
            let files = await FileModel.find()
            if (!files) return
            files.forEach(async (file) => {
                let { _id, exp_timestamp, uid } = file
                if (exp_timestamp <= Date.now()) {

                    await FileModel.deleteOne({ _id })
                    fs.unlink(path.resolve(__dirname, './', 'operative', uid!), (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Delete File successfully.");
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