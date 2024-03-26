const { uid } = require("uid");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.craeteNest = async (req, res) => {
  try {
    const newNest = await prisma.nest.create({
      data: {
        ...req.body,
      },
    });

    res.status(201).json({
      id: newNest.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, msg: "Internal server error" });
  }
};

exports.getAll = async (req, res) => {
  console.log("here");
  try {
    const allNests = await prisma.nest.findMany();
    console.log(allNests);
    res.status(200).json({ nests: allNests });
  } catch (error) {
    res.status(500).json({ error, msg: "Internal server error" });
  }
};
