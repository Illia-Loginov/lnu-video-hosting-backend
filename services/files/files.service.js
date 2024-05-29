import { query } from '../../db.js';
import { createReadStream } from 'fs';
import { upload, getUrl, deleteFile } from '../../s3.js';
import { unlink } from 'fs/promises';
import { clearUploads } from '../../middleware/multipart.middleware.js';
import { notFound } from '../../utils/errors.js';
import {
  validateGetAllFiles,
  validateGetFileById,
  validateUploadFile
} from './files.validate.js';

export const uploadFile = async (file, payload) => {
  const { title } = await validateUploadFile(payload);
  const { filename: id } = file;

  try {
    const fileStream = createReadStream(file.path);
    await upload(id, fileStream);

    await unlink(file.path);

    return (
      (
        await query(
          'INSERT INTO files (id, title) VALUES ($1, $2) RETURNING *',
          [id, title]
        )
      )?.rows?.[0] || {}
    );
  } catch (error) {
    await clearUploads();

    throw error;
  }
};

export const getAllFiles = async (payload) => {
  const { sort = {}, skip = 0, limit = 0 } = await validateGetAllFiles(payload);

  let queryText = 'SELECT id, title, created_at FROM files';
  const queryParams = [];

  if (Object.keys(sort).length) {
    queryText +=
      ' ORDER BY ' +
      Object.entries(sort)
        .map(([key, value]) => `${key} ${value}`)
        .join(', ');
  }

  if (skip) {
    queryText += ` OFFSET $${queryParams.length + 1}`;
    queryParams.push(skip);
  }

  if (limit) {
    queryText += ` LIMIT $${queryParams.length + 1}`;
    queryParams.push(limit);
  }

  return (await query(queryText, queryParams))?.rows || [];
};

export const getFileById = async (payload) => {
  const { id } = await validateGetFileById(payload);

  const [queryResult, url] = await Promise.all([
    query('SELECT title, created_at FROM files WHERE id = $1', [id]),
    getUrl(id)
  ]);

  if (!queryResult?.rows?.[0]) {
    throw notFound('File not found');
  }

  return {
    ...queryResult.rows[0],
    url
  };
};

export const deleteFileById = async (payload) => {
  const { id } = await validateGetFileById(payload);

  const queryResult = await query(
    'SELECT title, created_at FROM files WHERE id = $1',
    [id]
  );

  if (!queryResult?.rows?.[0]) {
    throw notFound('File not found');
  }

  await deleteFile(id);

  await query('DELETE FROM files WHERE id = $1', [id]);
};
