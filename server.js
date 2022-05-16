const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { verifyAuth } = require("./middleware/auth.middleware");

const PORT = process.env.PORT || 5000;

const PRODUCT_URL = "http://34.136.127.97:5001";
const USER_URL = "http://35.188.186.178:5002";
const PAYMENT_URL = "http://20.24.130.1:8080";
const ORDER_URL = "http://35.192.50.196:5000";
const AUTH_URL = "http://20.212.122.130:5000";
const FEEDBACK_URL = "http://20.212.122.130:5000";
const ADMIN_URL = "http://35.192.106.101:5000";

app.use("/products", verifyAuth, proxy(PRODUCT_URL));
app.use("/users", verifyAuth, proxy(USER_URL));
app.use("/orders", verifyAuth, proxy(ORDER_URL));
app.use("/feedbacks", verifyAuth, proxy(FEEDBACK_URL));
app.use("/admin", verifyAuth, proxy(ADMIN_URL));
app.use("/auth", verifyAuth, proxy(AUTH_URL));
app.use("/payments", verifyAuth, proxy(PAYMENT_URL));

app.get("/", (req, res) => res.status(200).send("<h3>SHOP API - GATEWAY SERVICE</h3>"));

app.listen(PORT, () => console.log(`gateway service is started and running on port ${PORT}`));
