import { useEffect, useState } from "react";

import API from "../api/axios";

import {
  CheckCircle,
  Clock,
  AlertTriangle,
  FolderKanban,
  ClipboardList,
  Loader,
  User,
  Activity,
} from "lucide-react";

import { useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const location = useLocation();

  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [location.pathname]);

  const fetchDashboardData =
    async () => {
      try {
        setLoading(true);

        const [
          tasksRes,
          projectsRes,
        ] = await Promise.all([
          API.get("/tasks"),
          API.get("/projects"),
        ]);

        setTasks(tasksRes.data);

        setProjects(
          projectsRes.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // STATS

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "todo"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "in-progress"
    ).length;

  const overdueTasks =
    tasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) <
          new Date() &&
        task.status !==
          "completed"
    );

  const completionRate =
    totalTasks > 0
      ? Math.round(
          (completedTasks /
            totalTasks) *
            100
        )
      : 0;

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(
          b.createdAt
        ) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      color:
        "bg-blue-100 text-blue-700",
    },

    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color:
        "bg-green-100 text-green-700",
    },

    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock,
      color:
        "bg-yellow-100 text-yellow-700",
    },

    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Loader,
      color:
        "bg-indigo-100 text-indigo-700",
    },

    {
      title: "Overdue",
      value: overdueTasks.length,
      icon: AlertTriangle,
      color:
        "bg-red-100 text-red-700",
    },

    {
      title: "Projects",
      value: projects.length,
      icon: FolderKanban,
      color:
        "bg-purple-100 text-purple-700",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* TOP HEADER */}

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome, {user?.name}
            </h1>

            <p className="mt-3 text-indigo-100 text-lg">
              Role:{" "}
              <span className="capitalize font-semibold">
                {user?.role}
              </span>
            </p>

            <p className="mt-2 text-indigo-100">
              Manage projects, monitor
              tasks and track team
              productivity.
            </p>
          </div>

          <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-md">
            <User size={50} />
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`p-4 rounded-2xl ${card.color}`}
                >
                  <Icon size={30} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROGRESS */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Completion Progress
          </h2>

          <span className="font-bold text-lg">
            {completionRate}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
          <div
            className="bg-green-500 h-5 rounded-full transition-all duration-500"
            style={{
              width: `${completionRate}%`,
            }}
          />
        </div>

        <p className="text-gray-500 mt-3">
          {completedTasks} of{" "}
          {totalTasks} tasks completed
        </p>
      </div>

      {/* OVERDUE TASKS */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-red-500" />

          <h2 className="text-2xl font-bold">
            Overdue Tasks
          </h2>
        </div>

        {overdueTasks.length === 0 ? (
          <p className="text-gray-500">
            No overdue tasks 🎉
          </p>
        ) : (
          <div className="space-y-4">
            {overdueTasks.map(
              (task) => (
                <div
                  key={task._id}
                  className="border border-red-200 bg-red-50 rounded-xl p-4"
                >
                  <h3 className="font-bold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {
                      task.description
                    }
                  </p>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span>
                      Assigned:{" "}
                      {task
                        .assignedTo
                        ?.name ||
                        "None"}
                    </span>

                    <span>
                      Due:{" "}
                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* RECENT TASKS */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="text-indigo-600" />

          <h2 className="text-2xl font-bold">
            Recent Tasks
          </h2>
        </div>

        {recentTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No recent tasks found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentTasks.map(
              (task) => (
                <div
                  key={task._id}
                  className="border rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-lg">
                        {task.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {
                          task.project
                            ?.title
                        }
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          task.status ===
                          "completed"
                            ? "bg-green-100 text-green-700"
                            : task.status ===
                              "in-progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {task.status}
                      </span>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {
                          task.priority
                        }
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-4">
                    <span>
                      Assigned:{" "}
                      {task
                        .assignedTo
                        ?.name ||
                        "None"}
                    </span>

                    <span>
                      Due:{" "}
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        : "No Date"}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;