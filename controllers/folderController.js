const client = require("../prisma/client");

exports.createFolder = async (req, res, next) => {
  try {
    let parentId = req.body.parentId;
    if (!req.body.parentId) {
      const parent = await client.folders.findFirst({
        where: {
          userId: req.user.id,
          type: "Root",
        },
      });
      parentId = parent.id;
    }

    await client.folders.create({
      data: {
        name: req.body.folderName,
        userId: req.user.id,
        parentId: parentId,
      },
    });
  } catch (err) {
    if (err.code !== "P2002") {
      throw new Error(err);
    }
  } finally {
    return res.redirect("/");
  }
};
