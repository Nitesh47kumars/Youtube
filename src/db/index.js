import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async () =>{
    try{
        const ConnectedDB = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n DB Connected!!! HOST: ${ConnectedDB.connection.host}`)
    }catch(e){
        console.log("ERROR:",e);
        process.exit(1)
    }
}

export default connectDB;
