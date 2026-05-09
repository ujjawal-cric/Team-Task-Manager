import { useState } from "react";

import API from "../api/axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

import {
  FolderKanban,
  LogIn,
} from "lucide-react";

const Login = () => {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (
        !form.email ||
        !form.password
      ) {
        return toast.error(
          "Please fill all fields"
        );
      }

      const { data } =
        await API.post(
          "/auth/login",
          form
        );

      login(data);

      toast.success(
        "Login successful"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex justify-center items-center px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100"
      >
        {/* HEADER */}

        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-4 rounded-2xl mb-4">
            <FolderKanban
              size={40}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Welcome
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Login to manage your
            projects and tasks.
          </p>
        </div>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        {/* BUTTON */}

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white w-full p-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <LogIn size={20} />

          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* FOOTER */}

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
