import { useState } from "react";

import API from "../api/axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

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
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <select
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
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

        {form.role === "admin" && (
          <input
            type="text"
            placeholder="Admin Secret"
            className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
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

        <button
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 transition text-white w-full p-3 rounded-xl font-semibold"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;