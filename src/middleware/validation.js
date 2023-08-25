const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );

    if (error) {
      let errors = [];
      error.details.forEach((err) => {
        errors.push({ message: err.message, field: err.path[0] });
      });
      res.json(errors);
    } else {
      next();
    }
  };
};

export default validate;
