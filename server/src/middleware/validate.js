module.exports.validate = (schema, source = "body") => {
    return (req, res, next) => {
      try {
        req.validated = schema.parse(req[source]);
        next();
      } catch (err) {
        res.status(400).json({
          error: "Validation failed",
          details: err.errors
        });
      }
    };
  };
  