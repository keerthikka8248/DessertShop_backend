//index.js

const express = require("express")
const app = express()
require("dotenv").config()

const cors = require("cors");
const morgan = require("morgan");
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging requests
app.use(express.json());

const mongoose = require("mongoose")

const port = process.env.PORT||5000
const mongo_url = process.env.MONGO_URL

async function DBconnection(){
    try{
        await mongoose.connect(mongo_url,{serverSelectionTimeoutMS: 5000 })
        app.listen(port,function(){
            console.log(`DB Connected - Listening to port ${port}`)
        })
    }
    catch(error){
        console.log("Error in connecting to DB")
        console.log(error)
    }
}
DBconnection();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);
