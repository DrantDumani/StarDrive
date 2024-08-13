const client = require("../prisma/client");

exports.get_folder = async (req, res, next) => {
  try {
    const folder = await client.folders.findUnique({
      where: {
        id: Number(req.params.folderId),
        userId: req.user.id,
      },
      include: {
        files: {
          select: {
            name: true,
            id: true,
          },
          orderBy: {
            created_at: "desc",
          },
        },
        nestedFolders: {
          select: {
            name: true,
            id: true,
          },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    res.render("dashboard", {
      title: folder.name,
      username: req.user.username,
      content: folder,
      currentFolderId: folder.id,
    });
  } catch (err) {
    console.error(err);
  }
};

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

exports.createNestedFolder = async (req, res, next) => {
  try {
    await client.folders.create({
      data: {
        name: req.body.folderName,
        userId: req.user.id,
        parentId: Number(req.params.folderId),
      },
    });
  } catch (err) {
    console.log(err);
    if (err.code !== "P2002") {
      throw new Error(err);
    }
  } finally {
    return res.redirect(`/folders/${req.params.folderId}`);
  }
};
