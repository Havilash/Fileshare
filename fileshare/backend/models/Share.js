const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mime_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const ShareCollectionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    files: [FileSchema],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ShareCollection = mongoose.model(
  "ShareCollection",
  ShareCollectionSchema
);

module.exports = ShareCollection;
