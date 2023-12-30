import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async ()=> {
    try{

        const conn = await mongoose.connect(process.env.MONOGODB_URL );
        console.log(`mongodb connected`)
    }
    catch(err){
        console.error(`error -${err}`)
        process.exit(1);
    }
}
export default connectDB