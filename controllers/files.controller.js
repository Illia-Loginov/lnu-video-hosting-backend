import * as filesService from '../services/files/files.service.js';

export const uploadFile = async (req, res, next) => {
  try {
    const metadata = await filesService.uploadFile(req.file, req.body);

    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
};

export const getAllFiles = async (req, res, next) => {
  try {
    const filesMetadata = await filesService.getAllFiles(req.query);

    res.status(200).json(filesMetadata);
  } catch (error) {
    next(error);
  }
};

export const getFileById = async (req, res, next) => {
  try {
    const fileMetadata = await filesService.getFileById(req.params);

    res.status(200).json(fileMetadata);
  } catch (error) {
    next(error);
  }
};
