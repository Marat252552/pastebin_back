import OperativeFileModel from "../../../DataFlow/mongo_database/Models/OperativeFileModel"


const DeleteFileFromMongoDatabaseById = (file_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await OperativeFileModel.deleteOne({ _id: file_id })
            console.log('SUCCESS - delete operative file from DB')
            resolve(null)
        } catch(e) {
            console.log('ERROR - delete operative file from DB')
            console.log(e)
            reject()
        }
    })
}

export default DeleteFileFromMongoDatabaseById