import dotenv from 'dotenv'
import app from './app'
import DBconnect from './database/DBconnect'
import path from "path";





dotenv.config()


const start = () => {
    let PORT = process.env.PORT
    try {
        DBconnect()

        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()