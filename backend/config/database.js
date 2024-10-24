const mongoose = require("mongoose");

const contectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://127.0.0.1:27017/sukriti");
    console.log(`connected to database ${con.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = contectDB;
