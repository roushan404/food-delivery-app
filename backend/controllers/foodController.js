import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";


//add food item

const addFood = async (req,res) =>{

    const  image_filename=req.file ? req.file.path:"";
    try{
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error  "})
    }
}

//all food list
const listFood= async (req,res) =>{
    try {
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood = async(req,res) =>{
        try {
            const food = await foodModel.findById(req.body.id)
            if (!food) {
            return res.json({ success: false, message: "Food item not found" });
            }
            const imageUrl = food.image;
            if (imageUrl) {
            const parts = imageUrl.split('/');
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex !== -1) {
            
                const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');
                const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
                
                await cloudinary.uploader.destroy(publicId);
            }
        }

            await foodModel.findByIdAndDelete(req.body.id)
            res.json({success:true,message:"Food-removed"})
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error"})
        }
}
export {addFood,listFood,removeFood}