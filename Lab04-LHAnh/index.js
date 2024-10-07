var express = require("express");
var app = express();

// Middleware để xử lý JSON
app.use(express.json());

// Các route khác
var sachRouter = require("./routes/sach");
app.use("/sach", sachRouter);

// Bắt đầu server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on port", port);
});
