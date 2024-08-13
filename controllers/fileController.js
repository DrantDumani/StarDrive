const client = require("../prisma/client");

exports.uploadFileToRoot = async (req, res, next) => {
  try {
    if (req.file) {
      const root = await client.folders.findFirst({
        where: {
          userId: req.user.id,
          type: "Root",
        },
        select: {
          id: true,
        },
      });

      await client.files.create({
        data: {
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
          dl_link: req.file.path,
          userId: req.user.id,
          folderId: root.id,
        },
      });
    }
  } catch (err) {
    if (err.code !== "P2002") {
      throw new Error(err);
    }
  } finally {
    return res.redirect("/");
  }
};

exports.uploadNestedFile = async (req, res, next) => {
  try {
    if (req.file) {
      await client.files.create({
        data: {
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
          dl_link: req.file.path,
          userId: req.user.id,
          folderId: Number(req.params.folderId),
        },
      });
    }
  } catch (err) {
    console.error(err);
    if (err.code !== "P2002") {
      throw new Error(err);
    }
  } finally {
    return res.redirect(`/folders/${req.params.folderId}`);
  }
};
