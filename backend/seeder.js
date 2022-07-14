const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Order = require("./model/orderModel");
const Product = require("./model/productModel");
const User = require("./model/userModel");
const users = require("./data/users");
const products = require("./data/products");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProds = products.map((prod) => {
      return { ...prod, user: adminUser };
    });
    await Product.insertMany(sampleProds);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
