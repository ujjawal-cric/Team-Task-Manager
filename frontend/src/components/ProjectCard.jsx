const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg">{project.title}</h2>

      <p className="text-gray-600 mt-2">
        {project.description}
      </p>

      <p className="mt-3 text-sm">
        Created By: {project.createdBy?.name}
      </p>
    </div>
  );
};

export default ProjectCard;