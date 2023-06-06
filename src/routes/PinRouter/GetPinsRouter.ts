import { Router } from "express"
import Controller from "./Controller"


const GetPinsRouter = () => {
    const router = Router()
    router.post('/', Controller.createPin)
    router.get('/:_id', Controller.getPin)
    return router
}

export default GetPinsRouter