import express from "express"
import { addFood,listFood,removeFood} from "../controllers/foodController.js"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const foodRouter =express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Image Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "food-images", // The folder name inside your Cloudinary media library
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
})

const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)


export default foodRouter