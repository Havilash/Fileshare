const Share = require("../models/Share");
const crypto = require("crypto");

exports.createShare = async (req, res, next) => {
  try {
    const files = req.body;
    const key = crypto.randomBytes(32).toString("hex");
    console.log(key, files);
    const share = await Share.create({ key, files });
    return res.status(201).json({
      success: true,
      data: { key },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Creating Share: ${error.message}`,
    });
  }
};

exports.getShare = async (req, res, next) => {
  try {
    const share = await Share.findOne({ key: req.params.key });
    if (!share) {
      return res.status(404).json({
        success: false,
        error: "Share Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: share,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Getting Share ${req.params.key}: ${error.message}`,
    });
  }
};

exports.updateShare = async (req, res, next) => {
  try {
    const share = await Share.findOne({ key: req.params.key });
    if (!share) {
      return res.status(404).json({
        success: false,
        error: "Share Not Found",
      });
    }
    share.files = req.body;
    await share.save();
    return res.status(200).json({
      success: true,
      data: share,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Updating Share ${req.params.key}: ${error.message}`,
    });
  }
};

exports.deleteShare = async (req, res, next) => {
  try {
    const share = await Share.findOne({ key: req.params.key });
    if (!share) {
      return res.status(404).json({
        success: false,
        error: "Share Not Found",
      });
    }
    await share.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Deleting Share ${req.params.key}: ${error.message}`,
    });
  }
};
