import React from "react";
import "./postCard.css";
import { likePost } from "../../Services/postServices";
import { removeLike } from "../../Services/api.js";

const PostCard = ({ post, setPosts }) => {
  const userId = localStorage.getItem("user-id"); // Identifica al usuario actual

  // Handle para dar/quitar like a un post
  const handleLikePost = async () => {
    try {
      let updatedPost;
      if (post.likes.includes(userId)) {
        updatedPost = await removeLike(post._id);
      } else {
        updatedPost = await likePost(post._id);
      }

      // Conservar la información del usuario al actualizar el post
      updatedPost.user = post.user;

      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Error al dar o quitar like:", error);
    }
  };

  return (
    <div className="post-card-container">
      <div className="post-card-header">
        <img
          src={post.user.profilePicture ||
            "https://i.pinimg.com/736x/79/8f/bf/798fbf62ba74a844ceeef90b83c76e59.jpg"} 
          alt="Foto de perfil"
          className="post-card-profile-pic"
        />
        <p className="post-card-username">{post.user.username}</p>
      </div>

      <img
        src={`http://localhost:3001/${post.imageUrl}`}
        alt="Post content"
        className="post-img"
      />

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
