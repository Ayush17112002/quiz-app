const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
require("./src/db/config");

app.use("/", require("./src/routes/index"));
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
