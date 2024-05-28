import * as filesService from '../services/files/files.service.js';

export const uploadFile = async (req, res, next) => {
  try {
    const rows = await filesService.uploadFile(req.file, req.body);

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const getAllFiles = async (req, res, next) => {
  try {
    const rows = await filesService.getAllFiles(req.query);

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
