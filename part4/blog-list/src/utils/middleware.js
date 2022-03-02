const jwt = require("jsonwebtoken");
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
  if (error.name === "JsonWebTokenError") {
    res.status(401).send({ error: "invalid token" });
  }
  if (error.name === "TokenExpiredError") {
    res.status(401).send({ error: "token expired" });
  }
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }
  req.token = token;
  next();
};

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    res.status(401).json({ error: "token missing or invalid" });
  }
  req.user = decodedToken;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoints,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
