const Task = require("../models/Task");

const taskAccess = async (
  req,
  res,
  next
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // ADMIN CAN ACCESS EVERYTHING
    if (req.user.role === "admin") {
      req.task = task;
      return next();
    }

    // ASSIGNED MEMBER CAN EDIT
    if (
      task.assignedTo &&
      task.assignedTo.equals(
        req.user._id
      )
    ) {
      req.task = task;
      return next();
    }

    return res.status(403).json({
      message:
        "Access denied. Not your task.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { taskAccess };