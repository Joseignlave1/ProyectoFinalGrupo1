import React from "react";
import "./postCard.css";
import { likePost } from "../../Services/postServices";

const PostCard = ({ post, setPosts }) => {
  const handleLikePost = async () => {
    try {
      const updatedPost = await likePost(post._id);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  return (
    <div className="post-card-container">
      <div className="post-card-header">
        <img
          src={post.user.profilePicture}
          alt="Foto de perfil"
          className="post-card-profile-pic"
        />
        <p className="post-card-username">{post.user.username}</p>
      </div>

      <img src={`http://localhost:3001/${post.imageUrl}`} alt="Post content" className="post-img"  />

      <div className="post-card-details">
        <p className="post-card-likes">
          <strong>{post.likes.length} Me gusta</strong>
        </p>
        <button className="post-card-like-icon" onClick={handleLikePost}>
          LIKE
        </button>
        <p className="post-card-description">
          <strong>{post.user.username}</strong> {post.caption}
          <span className="post-card-see-more">más</span>
        </p>
        <p className="post-card-view-comments">
          Ver los {post.comments.length} comentarios
        </p>
        <div className="post-card-comments">
          {post.comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
        </div>
        <p className="post-card-time">
          {new Date(post.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
