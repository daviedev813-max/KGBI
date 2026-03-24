import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    program: {
      type: String,
      // Matches the values in your frontend select menu
      enum: ["Part-time", "Full-time", "Bi-vocational"],
      required: true, // Recommended to ensure data integrity
    },
    message: { type: String },
    
    // 📎 Cloudinary Fields
    documentPath: { 
      type: String, 
      description: "The secure URL of the file in Cloudinary" 
    }, 
    cloudinaryId: { 
      type: String, 
      description: "Used to delete or manage the file in Cloudinary" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
