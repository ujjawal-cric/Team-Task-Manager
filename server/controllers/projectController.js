const Project = require("../models/Project");

const createProject = async (req, res) => {
  const { title, description, members } = req.body;

  const project = await Project.create({
    title,
    description,
    members,
    createdBy: req.user._id,
  });

  res.status(201).json(project);
};

const getProjects = async (req, res) => {
  const projects = await Project.find()
    .populate("members", "name email")
    .populate("createdBy", "name email");

  res.json(projects);
};

const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("members", "name email")
    .populate("createdBy", "name email");

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  res.json(project);
};

/*const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  project.members = req.body.members || project.members;

  const updatedProject = await project.save();

  res.json(updatedProject);
};*/
const updateProject = async (req, res) => {
  const project = await Project.findById(
    req.params.id
  );

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const isAdmin =
    req.user.role === "admin";

  const isCreator =
    project.createdBy.toString() ===
    req.user._id.toString();

  if (!isAdmin && !isCreator) {
    return res.status(403).json({
      message:
        "Not authorized to update project",
    });
  }

  project.title =
    req.body.title || project.title;

  project.description =
    req.body.description ||
    project.description;

  project.members =
    req.body.members || project.members;

  const updatedProject =
    await project.save();

  res.json(updatedProject);
};


/*const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  await project.deleteOne();

  res.json({
    message: "Project removed",
  });
};*/
const deleteProject = async (req, res) => {
  const project = await Project.findById(
    req.params.id
  );

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const isAdmin =
    req.user.role === "admin";

  const isCreator =
    project.createdBy.toString() ===
    req.user._id.toString();

  if (!isAdmin && !isCreator) {
    return res.status(403).json({
      message:
        "Not authorized to delete project",
    });
  }

  await project.deleteOne();

  res.json({
    message: "Project removed",
  });
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};