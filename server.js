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
const BASE_URL = "http://localhost:";
const PRODUCT_URL = "http://34.136.127.97:5001";
const USER_URL = "http://34.122.167.18:5002";
const PAYMENT_URL = "http://20.24.130.1:5007";

app.use("/products", verifyAuth, proxy(PRODUCT_URL));
app.use("/users", verifyAuth, proxy(USER_URL));
app.use("/orders", verifyAuth, proxy(`${BASE_URL}5003`));
app.use("/feedbacks", verifyAuth, proxy(`${BASE_URL}5004`));
app.use("/admin", verifyAuth, proxy(`${BASE_URL}5005`));
app.use("/auth", verifyAuth, proxy(`${BASE_URL}5006`));
app.use("/payments", verifyAuth, proxy(PAYMENT_URL));

app.get("/", (req, res) => res.status(200).send("<h3>SHOP API - GATEWAY SERVICE</h3>"));

app.listen(PORT, () => console.log(`gateway service is started and running on port ${PORT}`));
