const express = require('express');
const cors = require('cors');
const productRouter = require('./routers/productRouter.js');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId:process.env.AWS_ACESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
});

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

const dynamoDB = new AWS.DynamoDB.DocumentClient();


app.set("awsdynamoDB",dynamoDB)


app.use("/products",productRouter)


// Routes
app.get('/', (req, res) => {
    res.send("hello world");
});



// // Corrected MongoDB URI and mongoose connection
// mongoose
//     .connect("mongodb://127.0.0.1:27017/ecom1", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("Connected to MongoDB");
//         app.listen(9090, () => {
//             console.log("Server is running on http://localhost:9090");
//         });
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//     });

app.listen(9090, () => {
    console.log("Server is running on http://localhost:9090");
});



