const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Database Connected Succesfully");
  } catch {
    throw new Error("Database could not be connected");
  }
};
connect().catch((err) => console.log(err));
