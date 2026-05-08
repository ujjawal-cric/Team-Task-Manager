import { useEffect, useState } from "react";

import API from "../api/axios";

import toast from "react-hot-toast";

import {
  Trash2,
  Pencil,
  ClipboardList,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Tasks = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignedTo: "",
    project: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [
        tasksRes,
        projectsRes,
        usersRes,
      ] = await Promise.all([
        API.get("/tasks"),
        API.get("/projects"),
        API.get("/users"),
      ]);

      setTasks(tasksRes.data);

      setProjects(projectsRes.data);

      setUsers(usersRes.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        !form.title ||
        !form.description ||
        !form.project
      ) {
        return toast.error(
          "Please fill all required fields"
        );
      }

      if (editingId) {
        await API.put(
          `/tasks/${editingId}`,
          form
        );

        toast.success("Task updated");
      } else {
        await API.post("/tasks", form);

        toast.success("Task created");
      }

      setEditingId(null);

      setForm({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        assignedTo: "",
        project: "",
        dueDate: "",
      });

      await fetchAll();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const editTask = (task) => {
    setEditingId(task._id);

    setForm({
      title: task.title || "",

      description:
        task.description || "",

      priority:
        task.priority || "medium",

      status:
        task.status || "todo",

      assignedTo:
        task.assignedTo?._id ||
        task.assignedTo ||
        "",

      project:
        task.project?._id ||
        task.project ||
        "",

      dueDate: task.dueDate
        ? new Date(task.dueDate)
            .toISOString()
            .split("T")[0]
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteTask = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${id}`);

      toast.success("Task deleted");

      fetchAll();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const getStatusColor = (status) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "in-progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  const getPriorityColor = (
    priority
  ) => {
    if (priority === "high") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };

  const isOverdue = (task) => {
    return (
      task.dueDate &&
      new Date(task.dueDate) <
        new Date() &&
      task.status !== "completed"
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold">
          Loading Tasks...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList size={34} />

        <h1 className="text-4xl font-bold">
          Task Management
        </h1>
      </div>

      {(user.role === "admin" ||
        editingId) && (
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-2xl shadow-lg mb-10"
        >
          <h2 className="text-2xl font-bold mb-5">
            {editingId
              ? "Update Task"
              : "Create Task"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task Title"
              className="border p-3 rounded-xl"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
            />

            <input
              type="date"
              className="border p-3 rounded-xl"
              value={form.dueDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  dueDate:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Task Description"
              rows={4}
              className="border p-3 rounded-xl md:col-span-2"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />

            <select
              className="border p-3 rounded-xl"
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority:
                    e.target.value,
                })
              }
            >
              <option value="low">
                Low Priority
              </option>

              <option value="medium">
                Medium Priority
              </option>

              <option value="high">
                High Priority
              </option>
            </select>

            <select
              className="border p-3 rounded-xl"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status:
                    e.target.value,
                })
              }
            >
              <option value="todo">
                Todo
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

            <select
              className="border p-3 rounded-xl"
              value={form.project}
              disabled={
                user.role !== "admin"
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  project:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Project
              </option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              ))}
            </select>

            <select
              className="border p-3 rounded-xl"
              value={form.assignedTo}
              disabled={
                user.role !== "admin"
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  assignedTo:
                    e.target.value,
                })
              }
            >
              <option value="">
                Assign Member
              </option>

              {users.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                >
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl mt-6">
            {editingId
              ? "Update Task"
              : "Create Task"}
          </button>
        </form>
      )}

      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
          <h2 className="text-2xl font-bold">
            No Tasks Found
          </h2>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {tasks.map((task) => {
            const assignedId =
              task.assignedTo?._id ||
              task.assignedTo;

            const canEdit =
              user.role === "admin" ||
              assignedId === user._id;

            const canDelete =
              user.role === "admin";

            return (
              <div
                key={task._id}
                className={`bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition border ${
                  isOverdue(task)
                    ? "border-red-400"
                    : "border-transparent"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">
                      {task.title}
                    </h2>

                    {isOverdue(task) && (
                      <span className="text-red-500 text-sm font-medium">
                        Overdue Task
                      </span>
                    )}
                  </div>

                  {(canEdit ||
                    canDelete) && (
                    <div className="flex gap-2">
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() =>
                            editTask(
                              task
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <Pencil
                            size={18}
                          />
                        </button>
                      )}

                      {canDelete && (
                        <button
                          type="button"
                          onClick={() =>
                            deleteTask(
                              task._id
                            )
                          }
                          className="p-2 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2
                            size={18}
                            className="text-red-500"
                          />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mt-4">
                  {task.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <div className="mt-5 text-sm space-y-2 border-t pt-4">
                  <p>
                    <strong>
                      Assigned:
                    </strong>{" "}
                    {task.assignedTo
                      ?.name ||
                      "Unassigned"}
                  </p>

                  <p>
                    <strong>
                      Project:
                    </strong>{" "}
                    {task.project
                      ?.title ||
                      "No Project"}
                  </p>

                  <p>
                    <strong>
                      Due Date:
                    </strong>{" "}
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "No due date"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tasks;