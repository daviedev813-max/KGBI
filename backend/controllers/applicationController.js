import Application from "../models/Application.js";

// @desc Submit application with Cloudinary Upload
// @route POST /api/applications/create
export const createApplication = async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body;
    
    // Cloudinary stores the URL in 'path' and the unique ID in 'filename'
    const documentPath = req.file ? req.file.path : null;
    const cloudinaryId = req.file ? req.file.filename : null;

    const application = await Application.create({
      name,
      email,
      phone,
      program,
      message,
      documentPath, // This is now a https://res.cloudinary.com... link
      cloudinaryId  // Store this to allow for future deletion
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Submission Error:", error.message);
    // 400 status helps you see validation errors (like missing fields) in the frontend
    res.status(400).json({ message: error.message });
  }
};

// @desc Get all applications (Admin)
// @route GET /api/applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({ message: "Server Error fetching applications" });
  }
};
