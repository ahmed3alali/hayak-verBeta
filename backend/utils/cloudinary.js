import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/config/config.env" });

cloudinary.config({
  cloud_name: "taswoqi",
  api_key: 284218314918295,
  api_secret: "R8vL2iffDzXiAzcx7pFn7awa4O0",
});

export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder,
      }
    );
  });
};

export const delete_file = async (file) => {
  try {
    const res = await cloudinary.v2.uploader.destroy(file, {
      invalidate: true, // Ensures cache is cleared
      resource_type: "image",
    });

    return res?.result === "ok";
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    return false;
  }
};