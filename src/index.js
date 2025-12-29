import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config()


connectDB().
then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Listening on PORT: ${process.env.PORT}`)
    });

    app.on("Error",(error)=>{
        console.log("MongoDB Connection Error!!!",error);
    })
})
.catch((e)=>{
    console.log("MongoDB Connection Failed!!!",e)
})







/*

const app = express()
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("Error:",error);
            throw error
        });

        app.listen(process.env.PORT,()=>{
            console.log("App is Listening on Port:",process.env.PORT);
        })

    }catch(error){
        console.log("ERROR:",error);
        throw error
    }
})()


*/