const { Router } = require("express");

const router = Router();

// render all content inside of folder
router.get("/:folderId", (req, res) => {
  res.send(
    "Renders all content inside of the folder. folderId is used for upload form params"
  );
});

// create new folder
router.post("/create", (req, res) => {
  res.send(
    "Create a new folder. If parent folder in body, then this is a child"
  );
});

// edit the folder
router.post("/:folderId/edit", (req, res) => {
  res.send("Update the name of the folder you're in");
});

// visit delete page for folder
router.get("/:folderId/delete", (req, res) => {
  res.send("Visit the delete confirmation page of the folder you're in.");
});

// confirm delete
router.post("/:folderId/delete", (req, res) => {
  res.send("Delete the folder for good");
});

module.exports = router;
