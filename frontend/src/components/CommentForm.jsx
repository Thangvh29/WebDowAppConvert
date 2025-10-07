import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../assets/style/components/CommentForm.css'
const CommentForm = ({ onCommentAdded }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !content) {
      setError('Vui lòng nhập tên và nội dung');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/comments', { name, content });
      onCommentAdded(response.data);
      setName('');
      setContent('');
      setError('');
    } catch (err) {
      console.error('Lỗi khi gửi bình luận:', err);
      setError('Lỗi khi gửi bình luận');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung bình luận"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Gửi Bình Luận
      </Button>
    </Form>
  );
};

export default CommentForm;