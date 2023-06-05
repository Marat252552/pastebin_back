import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import GetFilesRouter from './routes/FilesRouter/GetFilesRouter'


const app = express()
app.use(fileUpload({}))
app.use(cors())


const FilesRouter = GetFilesRouter()

app.use('/files', FilesRouter)

export default app