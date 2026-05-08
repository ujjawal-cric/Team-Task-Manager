import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

import { Pencil, Trash2, Users } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Projects = () => {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    members: [],
  });
  

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [projectRes, userRes] =
        await Promise.all([
          API.get("/projects"),
          API.get("/users"),
        ]);

      setProjects(projectRes.data);

      setUsers(userRes.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  /*const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!form.title || !form.description) {
        return toast.error(
          "Please fill all required fields"
        );
      }

      if (editingId) {
        await API.put(
          `/projects/${editingId}`,
          form
        );

        toast.success("Project updated");
      } else {
        await API.post("/projects", form);

        toast.success("Project created");
      }

      setEditingId(null);

      setForm({
        title: "",
        description: "",
        members: [],
      });

      fetchAll();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };*/
  const submitHandler = async (e) => {
  e.preventDefault();

  try {
    if (!form.title || !form.description) {
      return toast.error(
        "Please fill all required fields"
      );
    }

    if (editingId) {
      await API.put(
        `/projects/${editingId}`,
        form
      );

      toast.success("Project updated");
    } else {
      await API.post("/projects", form);

      toast.success("Project created");
    }

    setEditingId(null);

    setForm({
      title: "",
      description: "",
      members: [],
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


  const editProject = (project) => {
    setEditingId(project._id);

    setForm({
      title: project.title,
      description: project.description,
      members:
        project.members?.map(
          (member) => member._id
        ) || [],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${id}`);

      toast.success("Project deleted");

      fetchAll();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };*/
  const deleteProject = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/projects/${id}`);

    toast.success("Project deleted");

    await fetchAll();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Delete failed"
    );
  }
};

  const toggleMember = (memberId) => {
    const exists =
      form.members.includes(memberId);

    if (exists) {
      setForm({
        ...form,
        members: form.members.filter(
          (id) => id !== memberId
        ),
      });
    } else {
      setForm({
        ...form,
        members: [
          ...form.members,
          memberId,
        ],
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold">
          Loading Projects...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Users size={34} />

        <h1 className="text-4xl font-bold">
          Project Management
        </h1>
      </div>

      {/* ONLY ADMIN CAN CREATE PROJECT */}
      {user.role === "admin" && (
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-2xl shadow-lg mb-10"
        >
          <h2 className="text-2xl font-bold mb-5">
            {editingId
              ? "Update Project"
              : "Create Project"}
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Project Title"
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Project Description"
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />

            <div>
              <h3 className="font-semibold mb-3">
                Assign Team Members
              </h3>

              <div className="grid md:grid-cols-3 gap-3">
                {users.map((member) => (
                  <label
                    key={member._id}
                    className={`border rounded-xl p-3 flex items-center gap-2 cursor-pointer transition
                      
                      ${
                        form.members.includes(
                          member._id
                        )
                          ? "bg-indigo-100 border-indigo-500"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={form.members.includes(
                        member._id
                      )}
                      onChange={() =>
                        toggleMember(
                          member._id
                        )
                      }
                    />

                    <span>{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl mt-6">
            {editingId
              ? "Update Project"
              : "Create Project"}
          </button>
        </form>
      )}

      {/* PROJECT LIST */}

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-bold">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first project to get
            started.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const canManage =
              user.role === "admin" ||
              project.createdBy?._id ===
                user._id;

            return (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {project.title}
                    </h2>

                    <p className="text-gray-600 mt-3">
                      {project.description}
                    </p>
                  </div>

                  {/* ONLY AUTHORIZED USERS */}
                  {canManage && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          editProject(project)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          deleteProject(
                            project._id
                          )
                        }
                        className="p-2 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2
                          size={18}
                          className="text-red-500"
                        />
                      </button>
                    </div>
                  )}
                </div>

                {/* MEMBERS */}

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">
                    Team Members
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {project.members?.length >
                    0 ? (
                      project.members.map(
                        (member) => (
                          <span
                            key={member._id}
                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                          >
                            {member.name}
                          </span>
                        )
                      )
                    ) : (
                      <p className="text-sm text-gray-500">
                        No members assigned
                      </p>
                    )}
                  </div>
                </div>

                {/* FOOTER */}

                <div className="mt-6 pt-4 border-t text-sm text-gray-600">
                  <p>
                    <strong>
                      Created By:
                    </strong>{" "}
                    {
                      project.createdBy
                        ?.name
                    }
                  </p>

                  <p className="mt-1">
                    <strong>
                      Total Members:
                    </strong>{" "}
                    {
                      project.members
                        ?.length
                    }
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

export default Projects;