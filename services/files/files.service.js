import { query } from '../../db.js';
import { createReadStream } from 'fs';
import { upload } from '../../s3.js';
import { unlink } from 'fs/promises';
import { clearUploads } from '../../middleware/multipart.middleware.js';

export const uploadFile = async (file, payload) => {
  const { title } = payload;
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
      )?.rows || []
    );
  } catch (error) {
    await clearUploads();

    throw error;
  }
};

export const getAllFiles = async (payload) => {
  const { sort = {}, skip = 0, limit = 0 } = payload;

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
