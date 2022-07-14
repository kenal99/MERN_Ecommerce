const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// Connect ENV
const dotenv = require("dotenv");
dotenv.config();

// Connect DB
const connectDB = require("./config/db");
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(fileUpload());
// APIs

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./frontend/build"));
  app.get("/", (req, res) =>
    res.sendFile(path.resolve(".", "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API Running");
  });
}

app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
