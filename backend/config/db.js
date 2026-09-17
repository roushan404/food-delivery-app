import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB= async ()=>{
    try {
        const uri = process.env.MONGO_URI;
        if(!uri){
            throw new Error("MONGO_URI is not defined in environment variables")
        }
        await mongoose.connect(uri)
        console.log("DB Connected");
    } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
    }
}