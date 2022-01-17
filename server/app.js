const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");

// const graphQlSchema = require("./graphql/schema/index");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
// const graphQlResolvers = require("./graphql/resolvers/index");

// require("dotenv").config();

const PORT = 8000;
const app = express();

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// app.use(isAuth);

//one single endpoint /graphql ;  no get, post , put etc
// query for fetching data
//mutation for create, editing data
//[String!]! - an arrray of not null elements
//_id 'cause will be easier to work with MongoDb , and ID is special type offered by GraphQL
// ! null isn't available

// 2 types of declaration
//     title:String! , description :String!,  price:Float  ! , date: String!
//     input EventInput{title :String! description :String!price:Float!date:String! }

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ku5rn.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`
  )

  .then(() => {
    console.log("Server start at port " + PORT);
    console.log("MongoDB is connected");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
