import React from "react";
import "./UserPost.css";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { likePost } from "../../Services/postServices";
import { removeLike } from "../../Services/api.js";

const UserPost = ({ post, userId, onClose, onLikeChange }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(userId));

  useEffect(() => {
    setLikes(post.likes.length);
    setLiked(post.likes.includes(userId));
  }, [post, userId]);

  const handleLikePost = async () => {
    try {
      let updatedPost;
      if (post.likes.includes(userId)) {
        updatedPost = await removeLike(post._id);
      } else {
        updatedPost = await likePost(post._id);
      }

      // Mantener los comentarios intactos y solo actualizar los likes
      updatedPost.comments = post.comments;

      // Actualizar solo los likes en el estado, sin tocar los comentarios
      // setPosts((prevPosts) =>
      //   prevPosts.map((p) =>
      //     p._id === updatedPost._id ? { ...p, likes: updatedPost.likes } : p
      //   )
      // );
    } catch (error) {
      console.error("Error al dar o quitar like:", error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="post-card">
        <img
          src={`http://localhost:3001/${post.imageUrl}`}
          alt="Post content"
          className="post-img"
        />

        <div className="post-actions">
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLikePost}
          >
            Like
          </button>
        </div>

        <div className="post-details">
          <p className="likes">
            <strong>{likes} Likes</strong>
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
            ))}
            a
          </div>
          <p className="time">
            {new Date(post.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default UserPost;