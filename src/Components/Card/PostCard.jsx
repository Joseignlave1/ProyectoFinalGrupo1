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
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.user.profilePicture}
          alt="Perfil"
          className="profile-pic"
        />
        <p className="post-username">{post.user.username}</p>
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <img src={post.imageUrl} alt="Contenido del post" className="post-img" />

      <div className="post-actions">
        <i className="far fa-heart" onClick={handleLikePost}></i>
        <i className="far fa-comment"></i>
      </div>

      <div className="post-details">
        <p className="likes">
          <strong>{post.likes.length}Me gusta</strong>
        </p>
        <p className="post-description">
          <strong>{post.user.username}</strong> {post.caption}
          <span className="see-more">más</span>
        </p>
        <p className="view-comments">
          Ver los {post.comments.length} comentarios
        </p>
        <div className="comments">
          {post.comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
        </div>
        <p className="time">{new Date(post.createdAt).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default PostCard;
