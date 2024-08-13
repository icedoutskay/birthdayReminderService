function checkForm(schema) {
    return (req, res, next) => {
      const result = schema.validate(req.body, { abortEarly: false });
      if (result.error) {
        // Extract error messages from details
        const errors = result.error.details.map((detail) => detail.message);
  
        return res.status(400).json({ errors });
      }
  
      next();
    };
  }
  
  export default checkForm;