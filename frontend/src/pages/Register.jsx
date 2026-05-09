import { useState } from "react";

import API from "../api/axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FolderKanban,
  UserPlus,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    adminSecret: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (
        !form.name ||
        !form.email ||
        !form.password
      ) {
        return toast.error(
          "Please fill all fields"
        );
      }

      await API.post(
        "/auth/register",
        form
      );

      toast.success(
        "Registration successful"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-emerald-100 flex justify-center items-center px-4">
      <form
        onSubmit={submitHandler}
        
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* HEADER */}

        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-100 p-4 rounded-2xl mb-4">
            <FolderKanban
              size={40}
              className="text-green-600"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Register to start managing
            projects and tasks.
          </p>
        </div>

        {/* NAME */}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        {/* ROLE */}

        <select
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="member">
            Member
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        {/* ADMIN SECRET */}

        {form.role === "admin" && (
          <input
            type="text"
            placeholder="Admin Secret Key"
            className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={
              form.adminSecret
            }
            onChange={(e) =>
              setForm({
                ...form,
                adminSecret:
                  e.target.value,
              })
            }
          />
        )}

        {/* BUTTON */}

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 transition text-white w-full p-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <UserPlus size={20} />

          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        {/* FOOTER */}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
