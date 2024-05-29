import multer, { MulterError } from 'multer';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { uploadsFolder, limits } from '../config/multipart.config.js';
import { badRequest } from '../utils/errors.js';

mkdirSync(path.resolve(uploadsFolder), { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, randomUUID());
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('video')) {
    return cb(badRequest('Only video files are allowed'), false);
  }

  cb(null, true);
};

export const uploadMiddleware = multer({ storage, limits, fileFilter }).single(
  'file'
);

export const clearUploads = async () => {
  const files = await readdir(uploadsFolder);

  await Promise.all(
    files.map((file) => unlink(path.resolve(uploadsFolder, file)))
  );
};

export const isMulterValidationError = (error) =>
  error instanceof MulterError &&
  (error.code === 'LIMIT_FILE_SIZE' || error.code === 'LIMIT_UNEXPECTED_FILE');
