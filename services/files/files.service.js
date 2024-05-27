import { query } from '../../db.js';
import { createReadStream } from 'fs';
import { upload } from '../../s3.js';
import { unlink } from 'fs/promises';

export const uploadFile = async (file, payload) => {
  const { title } = payload;
  const { filename: id } = file;

  const fileStream = createReadStream(file.path);
  await upload(id, fileStream);

  await unlink(file.path);

  const { rows = [] } = await query(
    'INSERT INTO files (id, title) VALUES ($1, $2) RETURNING *',
    [id, title]
  );

  return rows;
};
