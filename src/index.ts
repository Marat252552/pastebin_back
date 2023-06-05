import dotenv from 'dotenv'
import app from './app'


dotenv.config()


const start = () => {
    let PORT = process.env.PORT
    try {
        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT)
        })
    } catch(e) {
        console.log(e)
    }
}

start()