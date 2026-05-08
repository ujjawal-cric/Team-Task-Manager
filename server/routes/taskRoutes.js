/*const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, getTasks)
  .post(protect, adminOnly, createTask);

router
  .route("/:id")
  .put(protect, updateTask)
  .delete(protect, adminOnly, deleteTask);

module.exports = router;*/
const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/roleMiddleware");

const {
  taskAccess,
} = require("../middleware/taskPermission");

const router = express.Router();

router
  .route("/")
  .get(protect, getTasks)
  .post(protect, adminOnly, createTask);

router
  .route("/:id")
  .put(protect, taskAccess, updateTask)
  .delete(
    protect,
    adminOnly,
    deleteTask
  );

module.exports = router;