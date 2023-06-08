import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import GetFilesRouter from './routes/FilesRouter/GetFilesRouter'
import multer from 'multer'
import bodyParser from 'body-parser'
import OperativeFilesChecker from './OperativeFileChecker'
import GetPinsRouter from './routes/PinRouter/GetPinsRouter'
import path from 'path'
import AutoPinsDeleter from './AutoPinsDeleter'


export const upload = multer({dest: 'uploads/'})

const jsonBodyMiddleware = express.json()

const app = express()
// app.use(fileUpload({}))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(jsonBodyMiddleware)


const FilesRouter = GetFilesRouter()
const PinsRouter = GetPinsRouter()


app.use('/pins', PinsRouter)
app.use('/files', FilesRouter)
app.use(express.static(path.resolve(__dirname, 'static')))


OperativeFilesChecker()
AutoPinsDeleter()

export default app