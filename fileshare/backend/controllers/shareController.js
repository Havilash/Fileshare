const Share = require("../models/Share");

exports.createShare = async (req, res, next) => {
  try {
    const { files } = req.body;
    const key = Math.random().toString(36).substring(2, 66);
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

exports.getFileByName = async (req, res, next) => {
  try {
    const share = await Share.findOne({ key: req.params.key });
    if (!share) {
      return res.status(404).json({
        success: false,
        error: "Share Not Found",
      });
    }
    const file = share.files.find((f) => f.name === req.params.filename);
    if (!file) {
      return res.status(404).json({
        success: false,
        error: "File Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: file,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Getting File ${req.params.filename}: ${error.message}`,
    });
  }
};

exports.createFile = async (req, res, next) => {
  try {
    const share = await Share.findOne({ key: req.params.key });
    if (!share) {
      return res.status(404).json({
        success: false,
        error: "Share Not Found",
      });
    }
    const { name, content, mime_type } = req.body;
    const created_at = new Date();
    share.files.push({ name, content, mime_type, created_at });
    await share.save();
    return res.status(201).json({
      success: true,
      data: share.files[share.files.length - 1],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Creating File in Share ${req.params.key}: ${error.message}`,
    });
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    const share = await Share.findOne({ key: req.params.key });
    if (!share) {
      return res.status(404).json({
        success: false,
        error: "Share Not Found",
      });
    }
    const fileIndex = share.files.findIndex(
      (f) => f.name === req.params.filename
    );
    if (fileIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "File Not Found",
      });
    }
    share.files.splice(fileIndex, 1);
    await share.save();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Deleting File ${req.params.filename} from Share ${req.params.key}: ${error.message}`,
    });
  }
};

exports.updateFile = async (req, res, next) => {
  try {
    const share = await Share.findOne({ key: req.params.key });
    if (!share) {
      return res.status(404).json({
        success: false,
        error: "Share Not Found",
      });
    }

    const fileIndex = share.files.findIndex(
      (f) => f.name === req.params.filename
    );
    if (fileIndex === -1) {
      return res.status;
    }
    const { name, content } = req.body;
    share.files[fileIndex].name = name;
    share.files[fileIndex].content = content;
    share.files[fileIndex].updated_at = new Date();
    await share.save();
    return res.status(200).json({
      success: true,
      data: share.files[fileIndex],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Updating File ${req.params.filename} in Share ${req.params.key}: ${error.message}`,
    });
  }
};
