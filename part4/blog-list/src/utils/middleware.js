const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("-----");
  next();
};

const unknownEndpoints = (req, res) => {
  res.status(404).send({ error: "unknown endpoints" });
};

const errorHandler = (err, req, res, next) => {
  logger.err(err.message);
  if (err.name === "CastError") {
    res.status(400).send({ error: "malformated id" });
  }
  if (err.name === "ValidationError") {
    res.status(400).send({ error: err.message });
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoints,
  errorHandler,
};
