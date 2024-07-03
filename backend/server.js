const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5001;

app.use(bodyParser.json());

app.post("/write-xml", (req, res) => {
  const xmlData = req.body.xmlData;
  const filePath = path.join(__dirname, "public", "samplePage.xml");
  console.log("Writing to:", filePath); // Add this line
  fs.writeFile(filePath, xmlData, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to write file" });
    }
    res.json({ success: true, message: "File written successfully" });
  });
});

app.get("/read-xml", (req, res) => {
  const filePath = path.join(__dirname, "public", "samplePage.xml");
  console.log("Reading from:", filePath); // Add this line
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to read file" });
    }
    res.json({ success: true, xmlData: data });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
