const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");

const authRoute = require("./routes/auth");
dotenv.config();
// mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URL,

  { useNewUrlParser: true },
  () => {
    console.log("connected to mongo");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute); //whenever comes to this address it run useRoutes

app.use("/api/auth", authRoute);
// app.get("/", (req, res) => {
//   res.send("homepage");
// });

app.listen(7000, () => {
  console.log("backend runs at 7000");
});
