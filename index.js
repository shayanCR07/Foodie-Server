require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 6001;
const jwt = require("jsonwebtoken");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//middleware
app.use(cors());
app.use(express.json());

//mongodb configuration using mongoose
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodie-client.ob6waw6.mongodb.net/demo-foodie-client?authSource=admin&retryWrites=true&w=majority`
)
.then(() => console.log("Mongoose Connected Successfully!"))
.catch(err => console.log("MongoDB Error:", err.message));


//jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

//import routes here
const MenuRoutes = require("./api/routes/MenuRoutes");
const CartRoutes = require("./api/routes/CartRoutes");
const UserRoutes = require("./api/routes/UserRoutes");
const PaymentRoutes = require("./api/routes/PaymentsRoutes")
app.use("/cart", CartRoutes);
app.use("/menu", MenuRoutes);
app.use("/users", UserRoutes);
app.use("/payments",PaymentRoutes)

//stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
