import express from 'express'
import cors from 'cors'
import GetFilesRouter from './routes/FilesRouter/GetFilesRouter'
import bodyParser from 'body-parser'
import OperativeFilesCleaner from './LoopProcesses/OperativeFileCleaner/OperativeFileCleaner'
import GetPinsRouter from './routes/PinRouter/GetPinsRouter'
import PinsCleaner from './LoopProcesses/PinsCleaner/PinsCleaner'


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
// app.use(express.static(path.resolve(__dirname, 'static')))


OperativeFilesCleaner()
PinsCleaner()

export default app