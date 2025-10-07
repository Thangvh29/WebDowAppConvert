const { CONVERT_DOWNLOAD_LINK, CONVERTM_DOWNLOAD_LINK } = require('../utils/constants');

// Lấy link tải ứng dụng
exports.getDownloadLink = (req, res, next) => {
  try {
    res.status(200).json({
      convertLink: CONVERT_DOWNLOAD_LINK,
      convertmLink: CONVERTM_DOWNLOAD_LINK,
    });
  } catch (error) {
    next(error);
  }
};