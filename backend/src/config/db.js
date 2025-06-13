const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@network-online-service.bfjpnvo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  await client.connect();
  console.log("✅ MongoDB connected successfully.");
};

const getUserCollection = () => {
  return client.db("Network-Online-Service").collection("users");
};
const getCourseCollection = () => {
  return client.db("Network-Online-Service").collection("courses");
};
const getEnrollmentCollection = () => {
  return client.db("Network-Online-Service").collection("enrollments");
};
const getBlogsCollection = () => {
  return client.db("Network-Online-Service").collection("blog");
};
module.exports = {
  connectDB,
  getUserCollection,
  getCourseCollection,
  getEnrollmentCollection,
  getBlogsCollection,
};
