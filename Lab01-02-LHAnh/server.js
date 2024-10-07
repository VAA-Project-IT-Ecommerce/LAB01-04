const express = require("express");
const app = express();
//form
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//upload anh

// Route để xử lý upload ảnh

// Route để xóa ảnh

// Cấu hình EJS
app.set("view engine", "ejs");
app.set("views", "./views"); // Đường dẫn tới thư mục views
app.use(express.static("public")); // Dùng express.static để phục vụ tài nguyên tĩnh
// Route cho trang chủ
app.get("/", (req, res) => {
  res.send("Đây là trang chủ"); // Hoặc bạn có thể render một view
});
app.get("/search/:keywork/:page", (req, res) => {
  const keyword = req.params.keywork; // Lấy keyword từ params
  const page = req.params.page; // Lấy page từ params
  res.render("search", { keyword, page }); // Render view search.ejs
});

app.get("/cat", (req, res) => {
  const idcat = req.query.idcat; // Lấy idcat từ query
  const page = req.query.page; // Lấy page từ query
  res.render("cat", { idcat, page }); // Render view cat.ejs
});

app.get("/addEmail", (req, res) => {
  res.render("addEmail.ejs");
});

app.post("/addEmail", (req, res) => {
  let email = req.body.email;
  res.send(email);
});

// Route để render view chào
app.get("/chao", (req, res) => {
  res.render("chao", { title: "Xin chào", name: "Lê Hoàng Anh" });
});
app.get("/sp", (req, res) => {
  var sp = [
    { name: "HTC M9", price: "60000" },
    { name: "Samsung S8", price: "4000" },
  ];
  res.render("sp", { sp });
});

// Khởi động server
app.listen(3000, () => {
  console.log("Ứng dụng đang chạy với cổng 3000");
});
