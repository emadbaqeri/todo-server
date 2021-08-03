import Joi, { string, ValidationResult } from "joi";

export const CreateTodoValidator = (title: string, description: string) => {
  return Joi.object({
    title: Joi.string().max(256),
    description: Joi.string().max(1024),
  }).validate({ title, description });
};

export const UpdateTodoValidator = (id: string, state: string) => {
  return Joi.object({
    id: Joi.string().min(36).max(36),
    state: Joi.string().max(32),
  }).validate({ id, state });
};

export const DeleteTodoValidator = (id: string) => {
  return Joi.object({ id: Joi.string().min(36).max(36) }).validate({ id });
};
