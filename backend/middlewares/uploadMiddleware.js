import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images'); // Folder tempat file disimpan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Format nama file
  },
});

// Filter file untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG and PNG files are allowed'), false);
  }
};

// Middleware Multer
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5MB
  fileFilter,
});
