import Joi from 'joi';

const uploadFileSchema = Joi.object({
  title: Joi.string().min(1).max(100).required()
});

const getAllFilesSchema = Joi.object({
  sort: Joi.object({
    created_at: Joi.string().valid('ASC', 'DESC').optional()
  }).optional(),
  skip: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(0).optional()
});

const getFileByIdSchema = Joi.object({
  id: Joi.string().uuid({ version: 'uuidv4' }).required()
});

export const validateUploadFile = async (payload) => {
  return await uploadFileSchema.validateAsync(payload);
};

export const validateGetAllFiles = async (payload) => {
  return await getAllFilesSchema.validateAsync(payload);
};

export const validateGetFileById = async (payload) => {
  return await getFileByIdSchema.validateAsync(payload);
};
