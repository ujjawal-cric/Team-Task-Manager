const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, getProjects)
  .post(protect, adminOnly, createProject);

router
  .route("/:id")
  .get(protect, getProjectById)
  .put(protect, adminOnly, updateProject)
  .delete(protect, adminOnly, deleteProject);

module.exports = router;