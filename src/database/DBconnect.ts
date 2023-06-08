import mongoose from 'mongoose'
import PinModel from './Models/PinModel';

let DBconnect = async () => {
    let login = process.env.MONGO_DB_LOGIN
    let password = process.env.MONGO_DB_PASSWORD
    try {
        await mongoose.connect(`mongodb+srv://${login}:${password}@cluster0.j1cbuz9.mongodb.net/`);
        if(mongoose.connection.readyState === 1) {
            console.log('Mongo DB connected')
        } else if(mongoose.connection.readyState === 0){
            console.log('Mongo DB connection error')
        } else {
            console.log(mongoose.connection.readyState)
        }
    } catch(e) {
        console.log(mongoose.connection.readyState)
        console.log(e)
    }
}

export default DBconnect