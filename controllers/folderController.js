const client = require("../prisma/client");
const supabase = require("../supabase/client");

const bucketId = process.env.SUPABASE_BUCKET_ID;

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
    if (err.code !== "P2002") {
      throw new Error(err);
    }
  } finally {
    return res.redirect(`/folders/${req.params.folderId}`);
  }
};

exports.editFolder = async (req, res, next) => {
  try {
    await client.folders.update({
      where: {
        type: "Child",
        id: Number(req.params.folderId),
        userId: req.user.id,
      },
      data: {
        name: req.body.folderName,
      },
    });
  } catch (err) {
    if (err.code !== "P2002") {
      throw new Error(err);
    }
  } finally {
    return res.redirect(`/folders/${req.params.folderId}`);
  }
};

exports.delete_folder_get = async (req, res, next) => {
  try {
    const folder = await client.folders.findUnique({
      where: {
        id: Number(req.params.folderId),
        userId: req.user.id,
      },
    });

    res.render("deleteFolder", {
      title: folder.name,
      folder: folder,
      username: req.user.username,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

exports.delete_folder_post = async (req, res, next) => {
  try {
    const filesInFolder = await supabase.storage
      .from(bucketId)
      .list(`${req.user.id}/${req.params.folderId}`);

    const filePaths = filesInFolder.data.map(
      (file) => `${req.user.id}/${req.params.folderId}/${file.name}`
    );
    await supabase.storage.from(bucketId).remove(filePaths);
    const deletedFolder = await client.folders.delete({
      where: {
        id: Number(req.params.folderId),
        userId: req.user.id,
      },
    });
    res.redirect(`/folders/${deletedFolder.parentId}`);
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
