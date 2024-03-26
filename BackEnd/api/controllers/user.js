const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { uid } = require("uid");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const generateToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      userId: user.id,
    },
    process.env.JWT_KEY || "ldasjfnsakdfnjsdklfjnsdlkfnjds",
    {
      expiresIn: "1h",
    }
  );
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      delete user.password;
      res.status(200).json({ ...user });
    } else {
      res.status(404).json({ msg: "No such user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

exports.registerUser = async (req, res) => {
  try {
    if (invalidEmail(req.body.email) || invalidPassword(req.body.password))
      res.status(400).json({ msg: "Invalid input" });
    else {
      const newUser = await prisma.users.create({
        data: {
          ...req.body,
          id: uid(),
          username: req.body.email,
          password: await bcrypt.hash(req.body.password, saltRounds),
          status: "000",
        },
      });

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        token: generateToken(newUser),
        key: process.env.JWT_KEY || "noKey:(",
      });
    }
  } catch (err) {
    console.log(err);
    if (err.code === "P2002")
      res.status(409).json({ msg: "Email already exists" });
    else res.status(500).json({ err, msg: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.params;
    const userWithEmail = await prisma.users.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    if (userWithEmail) {
      delete userWithEmail.password;
      res.status(200).json({
        id: userWithEmail.id,
        username: userWithEmail.username,
        token: generateToken(userWithEmail),
      });
    } else {
      const userWithUsername = await prisma.users.findUnique({
        where: {
          username: email,
          password: password,
        },
      });
      if (userWithUsername) {
        delete userWithUsername.password;
        res.status(200).json({
          id: userWithUsername.id,
          username: userWithUsername.username,
          token: generateToken(userWithUsername),
        });
      } else {
        res.status(404).json({ msg: "No such user" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

exports.emailAvailable = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    if (invalidEmail(email)) res.status(400).json({ msg: "bad email" });
    else {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      console.log("user found? : ", user);
      if (user) {
        res.status(409).json();
      } else {
        res.status(200).json();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

exports.usernameAvailable = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      res.status(409).json();
    } else {
      res.status(200).json();
    }
  } catch (error) {
    res.status(500).json();
  }
};

const invalidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email);
};
const invalidUsername = (username) => {
  const re = /^[a-zA-Z0-9_@]{6,25}$/;
  return !re.test(username);
};
const invalidPassword = (password) => {
  const re = /^[a-zA-Z0-9_]{6,25}$/;
  return !re.test(password);
};
