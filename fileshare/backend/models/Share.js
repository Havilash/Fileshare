const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ShareCollectionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    files: [FileSchema],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ShareCollectionSchema.path("files").validate(function (files) {
  const fileNames = files.map((file) => file.name);
  return fileNames.length === new Set(fileNames).size;
}, "File names must be unique within a share");

const ShareCollection = mongoose.model("Shares", ShareCollectionSchema);

module.exports = ShareCollection;
