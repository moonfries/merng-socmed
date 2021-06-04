const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 7000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
mongoose.set("useUnifiedTopology", true);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGODB, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     });
//     console.log("MongoDB Conected");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };
