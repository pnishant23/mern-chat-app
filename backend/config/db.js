const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()



const MONGO_URI = process.env.MONGO_URI
const connectDB = async() => {
    try {
        const connection = await mongoose.connect(MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`MongoDB connected: HOST is => ${connection.connection.host}`.blue.underline)
    } catch (error) {
        console.log(`ERROR: ${error.message}`.red)
        // process.exit()
    }
}

module.exports = connectDB