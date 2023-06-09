import { Router } from "express"
import Controller from "./Controller"
import fileUpload from "express-fileupload"


const GetFilesRouter = () => {
    const router = Router()
    router.use(fileUpload({}))
    router.post('/', Controller.uploadFile)
    return router
}

export default GetFilesRouter