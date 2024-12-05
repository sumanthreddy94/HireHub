import multer from 'multer';
import path from 'path';

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with original name
  }
});

// Filter files
const fileFilter = (req, file, cb) => {
  const allowedFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'application/pdf'];
  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Please upload a PNG, JPG, JPEG, WEBP, or PDF format!'), false);
  }
};

// Initialize multer with file size limit and filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;
