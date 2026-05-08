const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold">{task.title}</h2>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>

      <div className="flex justify-between mt-4">
        <span className="text-sm bg-blue-100 px-2 py-1 rounded">
          {task.status}
        </span>

        <span className="text-sm bg-red-100 px-2 py-1 rounded">
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;