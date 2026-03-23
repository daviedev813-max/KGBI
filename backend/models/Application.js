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
    },
    message: { type: String },
    // 📎 New field for the uploaded ID or Certificate
    documentPath: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
