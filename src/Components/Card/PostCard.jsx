import React from "react";
import "./postCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.user.profilePicture}
          alt="Profile"
          className="profile-pic"
        />
        <p className="post-username">{post.user.username}</p>
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <img src={post.imageUrl} alt="Post content" className="post-img" />

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
          <span className="see-more">plus</span>
        </p>
        <p className="view-comments">
          Voir les {post.comments.length} commentaires
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
  );
};

export default PostCard;
