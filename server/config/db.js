require('dotenv').config()

var mongoose = require('mongoose');
const url= process.env.URL

const connectDB = async () => {
    try {
        await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
        console.log('successfully connected to mongoose');
    } catch(err) {
        console.err(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;