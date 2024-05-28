import multer from 'multer';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { uploadsFolder } from '../config/multipart.config.js';

mkdirSync(path.resolve(uploadsFolder), { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, randomUUID());
  }
});

export const uploadMiddleware = multer({ storage }).single('file');

export const clearUploads = async () => {
  const files = await readdir(uploadsFolder);

  await Promise.all(
    files.map((file) => unlink(path.resolve(uploadsFolder, file)))
  );
};
