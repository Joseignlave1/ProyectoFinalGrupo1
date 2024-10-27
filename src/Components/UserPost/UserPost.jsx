import React from "react";
import "./UserPost.css";
import Modal from "../Modal/Modal";

const UserPost = ({ post, onClose}) => {
  return (
    <Modal onClose={onClose}>
      <div className="post-card">

      <img src={`http://localhost:3001/${post.imageUrl}`} alt="Post content" className="post-img"  />

      <div className="post-actions">
        <i className="far fa-heart"></i>
        <i className="far fa-comment"></i>
      </div>

      <div className="post-details">
        <p className="likes">
          <strong>{post.likes.length} Likes</strong>
        </p>
        <p className="post-description">
          <strong>{post.user.username}</strong> {post.caption}
        </p>
        <p className="view-comments">
          Cantidad de comentarios: {post.comments.length}
        </p>
        <div className="comments">
          {post.comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}a
        </div>
        <p className="time">{new Date(post.createdAt).toLocaleTimeString()}</p>
      </div>
    </div>
    </Modal>
  );
};

export default UserPost;