const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/index");

// Set view engine để render EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sử dụng các route từ file routes/index.js
app.use("/", routes);

// Khởi động server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
