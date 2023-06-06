import { Router } from "express"
import Controller from "./Controller"
import { upload } from "../../app"
import fileUpload from "express-fileupload"


const GetFilesRouter = () => {
    const router = Router()
    router.use(fileUpload({}))
    // Добавляем middleware с названием файла
    // router.post('/', upload.single('file'), Controller.connect)
    router.post('/', Controller.uploadFile)

    
    return router
}

export default GetFilesRouter