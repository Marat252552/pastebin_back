import { Router } from "express"
import Controller from "./Controller"


const GetFilesRouter = () => {
    const router = Router()
    router.get('/', Controller.connect)
    return router
}

export default GetFilesRouter