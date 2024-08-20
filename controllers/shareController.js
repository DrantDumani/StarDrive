const client = require("../prisma/client");
const supabase = require("../supabase/client");

const bucketId = process.env.SUPABASE_BUCKET_ID;

exports.getShareFolder = (req, res, next) => {
  // queries the folder being shared
};

exports.getShareFile = (req, res, next) => {
  // queries the folder being shared for the specific file
};

exports.createShareLink = (req, res, next) => {
  // inserts a row for a new share id into the table
};
