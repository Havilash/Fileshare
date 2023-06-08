const express = require("express");
const router = express.Router();

/**Toy Car Controller */
const {
  getShare,
  createShare,
  getFileByName,
  createFile,
  updateFile,
  deleteFile,
} = require("../controllers/shareController");

/**
 *
 *
 * Add your routes for your API endpoints here. Don't forget to add your  controller!
 */

router.route("/share").post(createShare);
router.route("/share/:key").get(getShare);
router
  .route("/share/:key/:filename")
  .get(getFileByName)
  .post(createFile)
  .delete(deleteFile)
  .patch(updateFile);

module.exports = router;
