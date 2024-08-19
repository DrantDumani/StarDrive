const client = require("../prisma/client");
const supabase = require("../supabase/client");
const bucketId = process.env.SUPABASE_BUCKET_ID;

exports.getFileData = async (req, res, next) => {
  try {
    const file = await client.files.findUnique({
      where: {
        id: Number(req.params.fileId),
        userId: req.user.id,
      },
    });

    if (file) {
      return res.render("fileInfo", {
        title: file.name,
        file: file,
        username: req.user.username,
      });
    } else throw new Error(err);
  } catch (err) {
    console.error(err);
    return res.redirect("/");
  }
};

exports.downloadFileData = async (req, res, next) => {
  try {
    const file = await client.files.findUnique({
      where: {
        id: Number(req.params.fileId),
        userId: req.user.id,
      },
    });

    if (file) {
      const { data, error } = await supabase.storage
        .from(bucketId)
        .createSignedUrl(file.dl_link, 60, { download: true });

      return res.redirect(data.signedUrl);
    }
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

exports.uploadFileToRoot = async (req, res, next) => {
  try {
    if (req.file) {
      // upload file to supabase first
      const { data, error } = await supabase.storage
        .from(bucketId)
        .upload(`${req.user.id}/${req.file.originalname}`, req.file.buffer);

      if (error) {
        console.error("There was an error");
        return; // temporary exit until the duplicated error is handled
        // ideally, you'd want to just re-render with the modal visible and the error
      }

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
          dl_link: data.path,
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
      const { data, error } = await supabase.storage
        .from(bucketId)
        .upload(
          `${req.user.id}/${req.params.folderId}/${req.file.originalname}`
        );

      if (error) {
        console.error("There was an error");
        return; // temporary exit until the duplicated error is handled
        // ideally, you'd want to just re-render with the modal visible and the error
      }

      await client.files.create({
        data: {
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
          dl_link: data.path,
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

exports.getFileDelete = async (req, res, next) => {
  try {
    const file = await client.files.findUnique({
      where: {
        id: Number(req.params.fileId),
        userId: req.user.id,
      },
      select: {
        name: true,
        id: true,
      },
    });

    if (file) {
      return res.render("deleteFile", {
        title: "Delete file",
        file: file,
        username: req.user.username,
      });
    } else throw new Error();
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

exports.post_delete_file = async (req, res, next) => {
  try {
    const deletedFile = await client.files.delete({
      where: {
        id: Number(req.params.fileId),
        userId: req.user.id,
      },
    });

    await supabase.storage.from(bucketId).remove([deletedFile.dl_link]);
    res.redirect(`/folders/${deletedFile.folderId}/`);
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
