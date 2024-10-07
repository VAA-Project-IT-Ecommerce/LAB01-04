var express = require("express");
var router = express.Router();

var connectDB = require("../models/database"); // Adjust path as needed

// Get all records
router.get("/", async function (req, res) {
  try {
    const db = await connectDB();
    const sachCollection = db.collection("sach");
    const records = await sachCollection.find({}).toArray();
    res.json(records); // Return all records in JSON format
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async function (req, res) {
  try {
    const db = await connectDB();
    const sachCollection = db.collection("sach");

    // Nếu `_id` là giá trị số, chuyển đổi từ string sang số nguyên
    const recordId = parseInt(req.params.id);

    const record = await sachCollection.findOne({ _id: recordId });

    if (!record) {
      return res.status(404).send("Record not found");
    }

    res.json(record); // Return the record in JSON format
  } catch (error) {
    console.error("Error fetching record:", error);
    res.status(500).send("Error fetching record");
  }
});

// Add a new record
// Add a new record
router.post("/", async function (req, res) {
  try {
    const db = await connectDB(); // Kết nối tới MongoDB
    const sachCollection = db.collection("sach"); // Truy cập collection "sach"

    const newRecord = req.body; // Dữ liệu từ request body (thường là JSON)
    console.log("Dữ liệu thêm mới:", newRecord); // Log dữ liệu để kiểm tra

    // Kiểm tra xem _id có được định nghĩa không, nếu không thì để MongoDB tự tạo
    if (!newRecord._id) {
      console.log("No _id provided, MongoDB will generate one.");
    }

    const result = await sachCollection.insertOne(newRecord); // Chèn bản ghi mới

    res.json({ message: "Record added", result });
  } catch (error) {
    console.error("Error adding record:", error);
    res.status(500).send("Error adding record");
  }
});

// Update a record by ID
router.put("/:id", async function (req, res) {
  try {
    const db = await connectDB();
    const sachCollection = db.collection("sach");
    const recordId = parseInt(req.params.id);
    const updatedData = req.body; // Get the updated data from the request body
    const result = await sachCollection.updateOne(
      { _id: recordId },
      { $set: updatedData }
    );
    res.json({ message: "Record updated", result });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).send("Error updating record");
  }
});

// Delete a record by ID
router.delete("/:id", async function (req, res) {
  try {
    const db = await connectDB();
    const sachCollection = db.collection("sach");
    const recordId = parseInt(req.params.id);
    const result = await sachCollection.deleteOne({ _id: recordId });
    res.json({ message: "Record deleted", result });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send("Error deleting record");
  }
});

module.exports = router;
