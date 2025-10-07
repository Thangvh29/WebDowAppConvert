const Comment = require('../models/Comment');

// Lấy tất cả bình luận
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy bình luận', error: error.message });
  }
};

// Tạo bình luận mới
exports.createComment = async (req, res) => {
  try {
    const { name, content } = req.body;
    if (!name || !content) {
      return res.status(400).json({ message: 'Tên và nội dung là bắt buộc' });
    }
    const comment = new Comment({ name, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo bình luận', error: error.message });
  }
};