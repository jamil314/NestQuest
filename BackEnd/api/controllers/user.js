const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { db, sql } = require("@vercel/postgres");
const { getUserWithId } = require("../database/user");

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(getUserWithId(id));
    const user = result.rows[0];
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
