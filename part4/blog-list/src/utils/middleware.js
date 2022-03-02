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

const errorHandler = (error, req, res, next) => {
  logger.error("error: ", error.message);
  if (error.name === "CastError") {
    res.status(400).send({ error: "malformated id" });
  }
  if (error.name === "ValidationError") {
    res.status(400).send({ error: error.message });
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoints,
  errorHandler,
};
