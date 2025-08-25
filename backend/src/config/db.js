const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://Construction-Projects:dcw48n9B0WuIIFwp@construction-projects.z7ox4nb.mongodb.net/?retryWrites=true&w=majority&appName=Construction-Projects`;
// const uri = "mongodb+srv://Construction-Projects:<db_password>@construction-projects.z7ox4nb.mongodb.net/?retryWrites=true&w=majority&appName=Construction-Projects";

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
  return client.db("Construction-Projects").collection("users");
};

const getBlogsCollection = () => {
  return client.db("Construction-Projects").collection("blog");
};
const getBookingCollection = () => {
  return client.db("Construction-Projects").collection("bookings");
};
const getOnSiteVisitCollection = () => {
  return client.db("Construction-Projects").collection("OnSiteVisit");
};
const getTokenCollection = () => {
  return client.db("Construction-Projects").collection("Token");
};
const getReviewsCollection = () => {
  return client.db("Construction-Projects").collection("Reviws");
};
const getBeforeafterimageCollection = () => {
  return client.db("Construction-Projects").collection("BeforeAfterImage ");
};
const getImageTextSliderRoutesCollection = () => {
  return client.db("Construction-Projects").collection("ImageTextSlider ");
};

module.exports = {
  connectDB,
  getUserCollection,
  getBlogsCollection,
  getBookingCollection,
  getOnSiteVisitCollection,
  getTokenCollection,
  getReviewsCollection,
  getBeforeafterimageCollection,
  getImageTextSliderRoutesCollection
};
