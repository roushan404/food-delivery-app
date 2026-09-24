import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let connectionPromise;

export const connectDB = () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        return Promise.reject(new Error("MONGO_URI is not defined in environment variables"));
    }

    if (mongoose.connection.readyState === 1) {
        return Promise.resolve(mongoose.connection);
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(uri)
            .then((connection) => {
                console.log("DB Connected");
                return connection;
            })
            .catch((error) => {
                connectionPromise = undefined;
                throw error;
            });
    }

    return connectionPromise;
};
