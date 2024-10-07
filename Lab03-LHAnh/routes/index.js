const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://Anh:Anh2142003@cluster0.iyqpdy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Tự đổi qua Atlas

// 1. Chèn document vào MongoDB
router.get("/chenRecord", async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Kết nối thành công đến server");

  const db = client.db("tintuc");
  let doc1 = { idLoai: 10, tenLoai: "Khoa học", thuTu: 10, anHien: false };
  const loaitin = db.collection("loaitin");
  const insertResult = await loaitin.insertOne(doc1);
  res.status(200).send("Đã chèn xong. InsertedID = " + insertResult.insertedId);
  client.close();
});

// 2. Cập nhật document trong MongoDB
router.get("/capnhat", async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Kết nối thành công đến server");

  const db = client.db("tintuc");
  const loaitin = db.collection("loaitin");
  let myquery = { thuTu: 10 };
  let values = { $set: { tenLoai: "Đời sống", thuTu: 15 } };
  const kq = await loaitin.updateOne(myquery, values);
  res.status(200).send("Đã cập nhật xong " + kq.matchedCount + " dòng");
  client.close();
});

// 3. Cập nhật nhiều document trong MongoDB
router.get("/capnhatn", async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Kết nối thành công đến server");

  const db = client.db("tintuc");
  const loaitin = db.collection("loaitin");
  let myquery = { thuTu: { $lt: 5 } };
  let values = { $set: { thuTu: 1 } };
  const kq = await loaitin.updateMany(myquery, values);
  res.status(200).send("Đã cập nhật xong " + kq.matchedCount + " dòng");
  client.close();
});

// // 4. Xóa document trong MongoDB
// router.get("/xoaRecord", async (req, res) => {
//   const client = new MongoClient(uri);
//   await client.connect();
//   console.log("Kết nối thành công đến server");

//   const db = client.db("tintuc");
//   const loaitin = db.collection("loaitin");
//   let myquery = { thuTu: 15 };
//   const kq = await loaitin.deleteOne(myquery);
//   res.status(200).send("Đã xóa xong " + kq.deletedCount + " dòng");
//   client.close();
// });

// 5. Select document từ MongoDB
router.get("/layRecord", async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Kết nối thành công đến server");

  const db = client.db("tintuc");
  const loaitin = db.collection("loaitin");
  let myquery = {};
  const arr = await loaitin.find(myquery).toArray();
  client.close();
  res.render("loaitin", { listloaitin: arr });
});

// 6. Select 1 document từ MongoDB
router.get("/layRecord/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Kết nối thành công đến server");

  const db = client.db("tintuc");
  const loaitin = db.collection("loaitin");
  let myquery = { idTin: id };
  let data = await loaitin.findOne(myquery);

  // Kiểm tra nếu không có dữ liệu
  if (!data) {
    return res.status(404).send("Không tìm thấy loại tin với ID này");
  }

  res.render("chitietloai", { loaitin: data });
  client.close();
});

module.exports = router;
