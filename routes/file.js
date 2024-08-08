const { Router } = require("express");

const router = Router();

// render all content inside of file
router.get("/:fileId", (req, res) => {
  res.send("Render file details such as size, name, creation date, and type");
});

// create new file
router.post("/create", (req, res) => {
  res.send("Create a new file in root or folder");
});

// visit delete page for file
router.get("/:fileId/delete", (req, res) => {
  res.send("Visit the delete confirmation page of the file you're in.");
});

// confirm delete
router.post("/:fileId/delete", (req, res) => {
  res.send("Delete the file for good");
});

module.exports = router;
