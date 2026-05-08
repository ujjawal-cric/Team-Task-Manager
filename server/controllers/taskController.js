const asyncHandler = require(
  "express-async-handler"
);

const Task = require("../models/Task");

const Project = require(
  "../models/Project"
);

const createTask = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      project,
      assignedTo,
    } = req.body;

    if (
      !title ||
      !description ||
      !project
    ) {
      res.status(400);

      throw new Error(
        "Please fill required fields"
      );
    }

    const projectExists =
      await Project.findById(
        project
      );

    if (!projectExists) {
      res.status(404);

      throw new Error(
        "Project not found"
      );
    }

    const task =
      await Task.create(req.body);

    res.status(201).json(task);
  }
);

const getTasks = asyncHandler(
  async (req, res) => {
    const tasks = await Task.find()
      .populate(
        "assignedTo",
        "name email"
      )
      .populate("project", "title");

    res.json(tasks);
  }
);

const updateTask = asyncHandler(
  async (req, res) => {
    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {
      res.status(404);

      throw new Error(
        "Task not found"
      );
    }

    task.title =
      req.body.title ||
      task.title;

    task.description =
      req.body.description ||
      task.description;

    task.status =
      req.body.status ||
      task.status;

    task.priority =
      req.body.priority ||
      task.priority;

    task.dueDate =
      req.body.dueDate ||
      task.dueDate;

    task.assignedTo =
      req.body.assignedTo ||
      task.assignedTo;

    const updatedTask =
      await task.save();

    res.json(updatedTask);
  }
);

const deleteTask = asyncHandler(
  async (req, res) => {
    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {
      res.status(404);

      throw new Error(
        "Task not found"
      );
    }

    await task.deleteOne();

    res.json({
      message: "Task removed",
    });
  }
);

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};