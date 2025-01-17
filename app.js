import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import productRouter from "./routers/productRouter.js";


const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

app.use("/products",productRouter)


// Routes
app.get('/', (req, res) => {
    res.send("hello world");
});



// Corrected MongoDB URI and mongoose connection
mongoose
    .connect("mongodb://127.0.0.1:27017/ecom1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        // app.listen(9090, () => {
        //     console.log("Server is running on http://localhost:8080");
        // });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.listen(9090, () => {
            console.log("Server is running on http://localhost:8080");
        });

export default app;
