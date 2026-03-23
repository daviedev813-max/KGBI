import Application from "../models/Application.js";

// @desc Submit application with Document Upload
// @route POST /api/applications
export const createApplication = async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body;
    
    // Check if a file was uploaded via Multer
    const documentPath = req.file ? req.file.path : null;

    const application = await Application.create({
      name,
      email,
      phone,
      program,
      message,
      documentPath // Save the path to the database
    });

    res.status(201).json(application);
  } catch (error) {
    // 400 for validation errors, 500 for server crashes
    res.status(400).json({ message: error.message });
  }
};

// @desc Get all applications (Admin)
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
