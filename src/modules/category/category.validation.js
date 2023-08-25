import joi from "joi";

const idValidation = joi.string().hex().length(24).required();

export const addCategoryValidation = joi.object({
  name: joi.string().min(3).required(),
});

export const updateCategoryValidation = joi.object({
  name: joi.string().min(3),
  id: idValidation,
});

export const deleteCategoryValidation = joi.object({
  id: idValidation,
});
