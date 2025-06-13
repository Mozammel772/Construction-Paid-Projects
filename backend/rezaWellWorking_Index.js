// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const jwt = require("jsonwebtoken");
// const moment = require("moment");

// const port = process.env.PORT || 9000;
// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());

// // MongoDB setup
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@network-online-service.bfjpnvo.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// // JWT verify middleware
// const verifyToken = async (req, res, next) => {
//   const token = req.cookies?.token;
//   if (!token) {
//     return res.status(401).send({ message: "Unauthorized access" });
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorized access" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// // Verify Admin middleware
// const verifyAdmin = async (req, res, next) => {
//   const email = req.user?.email;
//   const query = { email };
//   const result = await userCollection.findOne(query);

//   if (!result || result?.role !== "admin") {
//     return res.status(403).send({ message: "Forbidden Access! Admin Only Actions!" });
//   }

//   next();
// };

// let userCollection; // Declare globally to use in middleware

// async function run() {
//   try {
//     await client.connect();
//     userCollection = client.db("Network-Online-Service").collection("users");

//     // 🔐 Get user role by email
//     app.get("/users/role/:email", async (req, res) => {
//       const email = req.params.email;
//       try {
//         const user = await userCollection.findOne({ email });
//         if (!user) {
//           return res.status(404).json({ role: "user" });
//         }
//         res.json({ role: user.role });
//       } catch (error) {
//         console.error("Error fetching user role:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     });

//     // 🔑 JWT Login: send token to client
//     app.post("/jwt", async (req, res) => {
//       const { email } = req.body;
//       const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "365d",
//       });
//       res
//         .cookie("token", token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//           sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//         })
//         .send({ success: true });
//     });

//     // 🔓 Logout route
//     app.get("/logout", (req, res) => {
//       res
//         .clearCookie("token", {
//           maxAge: 0,
//           secure: process.env.NODE_ENV === "production",
//           sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//         })
//         .send({ success: true });
//     });

//     // 👤 Register new user
//     app.post("/users", async (req, res) => {
//       const user = req.body;
//       const query = { email: user.email };
//       const existingUser = await userCollection.findOne(query);

//       if (existingUser) {
//         return res.status(400).send({ success: false, message: "User already exists" });
//       }

//       // Set "admin" only if it's the first user
//       const totalUsers = await userCollection.estimatedDocumentCount();
//       const role = totalUsers === 0 ? "admin" : "user";

//       const newUser = {
//         ...user,
//         createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
//         role,
//         imgUrl: "https://i.ibb.co/4Vg7qxJ/4042356.png",
//       };

//       try {
//         const result = await userCollection.insertOne(newUser);
//         res.send({ success: true, insertedId: result.insertedId });
//       } catch (error) {
//         console.error("MongoDB Error:", error);
//         res.status(500).send({ success: false, message: "MongoDB insertion failed" });
//       }
//     });

//     // 👀 Get all users (only admin can see, excluding themselves)
//     app.get("/all-users/:email", verifyToken, verifyAdmin, async (req, res) => {
//       const email = req.params.email;
//       const query = { email: { $ne: email } };
//       const result = await userCollection.find(query).toArray();
//       res.send(result);
//     });

//     console.log("✅ MongoDB connected successfully.");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//   }
// }

// run();

// app.get("/", (req, res) => {
//   res.send("🌐 Network Online service running...");
// });

// app.listen(port, () => {
//   console.log(`🚀 Server is listening on port ${port}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const port = process.env.PORT || 9000;
const app = express();

// Middleware
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@network-online-service.bfjpnvo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let userCollection;

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).send({ message: "Unauthorized access" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized access" });

        const user = await userCollection.findOne({ email: decoded.email });
        if (!user) return res.status(401).send({ message: "User not found" });

        const now = Date.now();
        const lastActive = user.lastActive || now;
        const diff = now - lastActive;

        if (diff > 1 * 60 * 1000) {
            // inactive more than 1 minute
            return res.status(440).send({ message: "Session expired due to inactivity" });
        }

        // update last active time
        await userCollection.updateOne(
            { email: decoded.email },
            { $set: { lastActive: now } }
        );

        req.user = decoded;
        next();
    });
};


const verifyAdmin = async (req, res, next) => {
    const email = req.user?.email;
    const result = await userCollection.findOne({ email });
    if (!result || result?.role !== "admin") {
        return res.status(403).send({ message: "Forbidden Access! Admin Only Actions!" });
    }
    next();
};

async function run() {
    try {
        await client.connect();
        userCollection = client.db("Network-Online-Service").collection("users");
        const courseCollection = client.db("Network-Online-Service").collection("courses");

        // Ping endpoint to update activity
        app.get("/ping", verifyToken, async (req, res) => {
            await userCollection.updateOne(
                { email: req.user.email },
                { $set: { lastActive: Date.now() } }
            );
            res.send({ success: true });
        });

        // JWT Login
        app.post("/jwt", async (req, res) => {
            const { email } = req.body;
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1d",
            });

            await userCollection.updateOne(
                { email },
                { $set: { lastActive: Date.now() } },
                { upsert: true }
            );

            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ success: true });
        });

        // Logout
        app.get("/logout", (req, res) => {
            res
                .clearCookie("token", {
                    maxAge: 0,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ success: true });
        });


        // Register new user
        app.post("/users", async (req, res) => {
            const user = req.body;
            const existingUser = await userCollection.findOne({ email: user.email });

            if (existingUser) {
                return res.status(400).send({ success: false, message: "User already exists" });
            }

            const totalUsers = await userCollection.estimatedDocumentCount();
            const role = totalUsers === 0 ? "admin" : "user";

            const newUser = {
                ...user,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                role,
                imgUrl: "https://i.ibb.co/4Vg7qxJ/4042356.png",
                lastActive: Date.now(),
            };

            const result = await userCollection.insertOne(newUser);
            res.send({ success: true, insertedId: result.insertedId });
        });

        // Admin only - get all users
        app.get("/all-users/:email", verifyToken, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const result = await userCollection
                .find({ email: { $ne: email } })
                .toArray();
            res.send(result);
        });

        // 🔐 Get user role by email
        app.get("/users/role/:email", async (req, res) => {
            const email = req.params.email;
            try {
                const user = await userCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ role: "user" });
                }
                res.json({ role: user.role });
            } catch (error) {
                console.error("Error fetching user role:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });


        // course controller and api endpoint

        app.get("/get-all-course", async (req, res) => {
            const courses = await courseCollection.find({}).toArray();
            res.status(200).json(courses)
        });

        console.log("✅ MongoDB connected successfully.");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}

run();

app.get("/", (req, res) => {
    res.send("🌐 Network Online service running...");
});

app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
});
