const client = require("../prisma/client");

exports.dashboard = async (req, res, next) => {
  try {
    const rootContents = await client.folders.findFirst({
      where: {
        userId: req.user.id,
        type: "Root",
      },
      include: {
        files: {
          orderBy: {
            created_at: "desc",
          },
          select: {
            name: true,
            id: true,
            created_at: true,
          },
        },
        nestedFolders: {
          orderBy: {
            created_at: "desc",
          },
          select: {
            name: true,
            id: true,
            created_at: true,
          },
        },
      },
    });

    return res.render("dashboard", {
      title: "Star Drive",
      username: req.user.username,
      content: rootContents,
    });
  } catch (err) {
    console.error(err);
  }
};
