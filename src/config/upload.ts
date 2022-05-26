import multer from 'multer';
import path from 'path'; //Express
import crypto from 'crypto'; //Express

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads'); //configuração do caminho da pasta uploads

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');

            const filename = `${fileHash}-${file.originalname}`;

            callback(null, filename);
        },
    }),
};
