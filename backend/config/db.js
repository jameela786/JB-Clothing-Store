const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connection established:,${conn.connection.host}`)
    }catch(error){
        console.log(`Error in DB connect= ${error.message}`);
        process.exit(1);
    };
};

module.exports = connectDB;