//image upload
const multer = require('multer');
const path = require('path');

//upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'avatars');
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1023 *5 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if(mimeType && extname){
            return cb(null, true);        
        }
        cb('Give proper files format to upload jpg|jpeg|png|gif');
    }
});

module.exports = {upload, storage};
