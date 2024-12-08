import multer from "multer";
import multerS3 from 'multer-s3';
import s3 from "../s3-client.js";

const bucket = process.env.AWS_S3_BUCKET;

const uploadSingleImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const timestamp = Date.now();
            cb(null, `${timestamp}-${file.originalname}`);
        },
        contentType: (req, file, cb) => {
            cb(null, file.mimetype);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
    },
}).single('image');
  
const checkIfFileExists = async (fileName) => {
    const params = {
        Bucket: bucket,
        Key: fileName,
    };
  
    try {
        await s3.headObject(params).promise();
        return true;
    } catch (err) {
        if (err.code === 'NotFound') {
            return false;
        }
        throw err;
    }
};

export const uploadImage = (req, res, next) => {
    uploadSingleImage(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).send({ message: 'Erro ao salvar imagem.' });
        }
    
        if (req.file) {
            const imageKey = req.file.key;

            // Checking if file exists already
            const fileExists = await checkIfFileExists(imageKey);
    
            if (fileExists) {
                // Use existing url
                req.body.imageUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;
                console.log('Image send sucessfully to S3.');
            } else {
                // Send new url
                req.body.imageUrl = req.file.location;
            }

            req.body.imageKey = imageKey;
        }
    
        return next();
    });
};

export const deleteImage = async (imageKey) => {
    const params = {
        Bucket: bucket,
        Key: imageKey,
    };
  
    try {
        await s3.deleteObject(params).promise();
        console.log('Image deleted successfully.');
    } catch (err) {
        console.error('Error while deleting image:', err);
        throw new Error('Error while deleting image.');
    }
};