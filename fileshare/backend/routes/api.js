const express = require("express");
const router = express.Router();

const {
  getShare,
  createShare,
  deleteShare,
  getFileByName,
  createFile,
  updateFile,
  deleteFile,
} = require("../controllers/shareController");

router.use(express.json());

router.route("/share").post(createShare);
router.route("/share/:key").get(getShare).delete(deleteShare);
router.route("/share/:key/file").post(createFile);
router.route("/share/:key/file/:filename").delete(deleteFile).patch(updateFile);

module.exports = router;
