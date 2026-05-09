const asyncHandler = require(
  "express-async-handler"
);

const validator = require("validator");

const User = require("../models/User");

const generateToken = require(
  "../utils/generateToken"
);

const registerUser = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      password,
      role,
      adminSecret,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      res.status(400);

      throw new Error(
        "Please fill all fields"
      );
    }

    if (
      !validator.isEmail(email)
    ) {
      res.status(400);

      throw new Error(
        "Invalid email format"
      );
    }

    if (password.length < 6) {
      res.status(400);

      throw new Error(
        "Password must be at least 6 characters"
      );
    }

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {
      res.status(400);

      throw new Error(
        "User already exists"
      );
    }

    let userRole = "member";

    // ADMIN ACCESS ONLY WITH SECRET
    if (role === "admin") {
  if (
    adminSecret !==
    process.env.ADMIN_SECRET
  ) {
    return res.status(401).json({
      message:
        "Invalid admin secret key",
    });
  }

  finalRole = "admin";
}
    const user =
      await User.create({
        name,
        email,
        password,
        role: userRole,
      });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(
        user._id
      ),
    });
  }
);

const loginUser = asyncHandler(
  async (req, res) => {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (
      user &&
      (await user.matchPassword(
        password
      ))
    ) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(
          user._id
        ),
      });
    } else {
      res.status(401);

      throw new Error(
        "Invalid credentials"
      );
    }
  }
);

const getMe = asyncHandler(
  async (req, res) => {
    res.json(req.user);
  }
);

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
