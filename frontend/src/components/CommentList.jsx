import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../assets/style/components/CommentList.css';

const CommentList = ({ comments }) => {
  return (
    <ListGroup className="mt-4">
      {comments.length === 0 ? (
        <ListGroup.Item>Chưa có bình luận nào.</ListGroup.Item>
      ) : (
        comments.map((comment, index) => (
          <ListGroup.Item key={comment._id} style={{ '--i': index }}>
            <div className="d-flex align-items-center">
              <div className="avatar">{comment.name[0]}</div>
              <div>
                <strong>{comment.name}</strong>
                <p>{comment.content}</p>
                <small className="text-muted">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

export default CommentList;