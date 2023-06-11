const express = require("express");
const router = express.Router();

const {
  getShare,
  createShare,
  updateShare,
  deleteShare,
} = require("../controllers/shareController");

router.use(express.json());

router.route("/share").post(createShare);
router
  .route("/share/:key")
  .get(getShare)
  .patch(updateShare)
  .delete(deleteShare);

module.exports = router;
