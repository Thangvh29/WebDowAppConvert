
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import '../assets/style/sections/Section4.css';
const Section4 = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy bình luận:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  };

  return (
    <section id="section4" className="py-5">
      <Container>
        <h2 className="text-center mb-4">Bình Luận & Đánh Giá</h2>
        <CommentForm onCommentAdded={handleCommentAdded} />
        <CommentList comments={comments} />
      </Container>
    </section>
  );
};

export default Section4;