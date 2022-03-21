require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const User = require("./models/User");

const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected a mongodb");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), SECRET);
        console.log("decodedtoken", decodedToken);
        const currentUser = await User.findById(decodedToken.id);
        console.log("currentUser", currentUser);
        return { currentUser };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4001;

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
};

start();
