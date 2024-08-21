const client = require("../prisma/client");
const supabase = require("../supabase/client");

const bucketId = process.env.SUPABASE_BUCKET_ID;

exports.getShareFolder = async (req, res, next) => {
  try {
    const shareLink = await client.shareLinks.findUnique({
      where: {
        id: req.params.shareId,
        expires_at: {
          gt: new Date(),
        },
      },
      include: {
        shareFolder: {
          include: {
            nestedFolders: true,
            files: {
              select: {
                name: true,
                id: true,
              },
              orderBy: {
                created_at: "desc",
              },
            },
          },
        },
      },
    });

    if (!shareLink) throw new Error();

    const shareUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log(shareUrl);

    res.render("dashboard", {
      title: shareLink.shareFolder.name,
      content: shareLink.shareFolder,
      currentFolderId: shareLink.shareFolder.id,
      shareLink: true,
      shareId: req.params.shareId,
      username: req.user?.username || false,
      shareUrl: shareUrl,
    });
  } catch (err) {
    return res.render("invalidShare", {
      username: req?.user?.username,
    });
  }
};

exports.getShareFile = async (req, res, next) => {
  try {
    const validLink = await client.shareLinks.findUnique({
      where: {
        id: req.params.shareId,
        expires_at: {
          gt: new Date(),
        },
      },
      include: {
        shareFolder: {
          include: {
            files: {
              where: {
                id: Number(req.params.fileId),
              },
            },
          },
        },
      },
    });

    const file = validLink?.shareFolder?.files[0];
    if (!validLink || !file) throw new Error();

    res.render("fileInfo", {
      title: file.name,
      file: file,
      username: req?.user?.username || false,
      shareLink: true,
      shareId: req.params.shareId,
    });
    console.log(new Date() > validLink.expires_at);
    console.log(new Date() < validLink.expires_at);
    console.log(validLink.expires_at);
    console.log(req.originalUrl);
  } catch (err) {
    return res.render("invalidShare", {
      username: req?.user?.username,
    });
  }
};

exports.createShareLink = async (req, res, next) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + Number(req.body.shareDuration));
  try {
    const shareLink = await client.shareLinks.create({
      data: {
        folderId: Number(req.params.folderId),
        expires_at: expiresAt,
      },
    });

    return res.redirect(`/share/${shareLink.id}`);
  } catch (err) {
    if (err) {
      console.error(err);
      return next();
    }
  }
};

exports.downloadFileData = async (req, res, next) => {
  try {
    const validLink = await client.shareLinks.findUnique({
      where: {
        id: req.params.shareId,
        expires_at: {
          gt: new Date(),
        },
      },
      include: {
        shareFolder: {
          include: {
            files: {
              where: {
                id: Number(req.params.fileId),
              },
            },
          },
        },
      },
    });

    const file = validLink?.shareFolder?.files?.[0];

    if (file) {
      const { data, error } = await supabase.storage
        .from(bucketId)
        .createSignedUrl(file.dl_link, 60, { download: true });

      return res.redirect(data.signedUrl);
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.render("invalidShare", {
      username: req?.user?.username,
    });
  }
};
