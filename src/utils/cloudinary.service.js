import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
})
const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (! localFilePath) {
            return null
            
        }
        else{
            const result = await cloudinary.uploader.upload(localFilePath, {
                resource_type : "auto"
            })
            console.log("File is succesfully uploaded on Cloudinary", result.url);
            return result
        }
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary};