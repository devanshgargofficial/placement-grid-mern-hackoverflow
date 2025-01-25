import multer from 'multer';

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Define file filter to restrict file types
const fileFilter1 = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only CSV files are allowed'), false); // Reject the file
  }
};
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/logos/'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter2 = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error('Only image files are allowed'), false); // Reject non-image files
  }
};

// Initialize multer with the configuration
const upload1 = multer({
  storage,
  fileFilter: fileFilter1,
});

const upload2 = multer({
  storage: storage2,
  fileFilter: fileFilter2,
});

export { upload1, upload2 };
