require("dotenv").config();
const express = require("express");
const contectDB = require("./config/database");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const app = express();

contectDB();

//middelware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1", userRouter);
app.get("/", (req, res) => {
  res.send("app okay");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
