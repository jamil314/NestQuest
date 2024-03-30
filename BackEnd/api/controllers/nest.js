const { uid } = require("uid");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.craeteNest = async (req, res) => {
  try {
    const newNest = await prisma.nest.create({
      data: {
        ...req.body,
        id: uid(),
        ownerId: req.userId,
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
  try {
    const allNests = await prisma.nest.findMany();
    console.log(allNests);
    res.status(200).json({ nests: allNests });
  } catch (error) {
    res.status(500).json({ error, msg: "Internal server error" });
  }
};
exports.getNestById = async (req, res) => {
  const { id } = req.params;

  try {
    const nest = await prisma.nest.findUnique({
      where: {
        id: id,
      },
    });
    console.log(nest);
    res.status(200).json({ nests: nest });
  } catch (error) {
    res.status(500).json({ error, msg: "Internal server error" });
  }
};
