const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
app = express();
app.use(express.json());
require("./src/db/config");
app.use("/", require("./src/routes/index"));
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
