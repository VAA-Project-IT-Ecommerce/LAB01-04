const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://Anh:Anh2142003@cluster0.iyqpdy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Ket noi thanh cong den server");
    const db = client.db("qlsach");
    return db;
  } catch (error) {
    console.log("Loi ket noi database", error);
  }
}
module.exports = connectDB;
