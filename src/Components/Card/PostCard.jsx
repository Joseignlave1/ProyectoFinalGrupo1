import React, { useState } from "react";
import "./postCard.css";
import CommentsModal from "../Modal/CommentsModal";
import { likePost, removeLike } from "../../Services/postServices";

const PostCard = ({ post, setPosts }) => {
  const userId = localStorage.getItem("user-id");
  const [isModalOpen, setModalOpen] = useState(false);

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
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === updatedPost._id ? { ...p, likes: updatedPost.likes } : p
        )
      );
    } catch (error) {
      console.error("Error al dar o quitar like:", error);
    }
  };

  return (
    <div className="post-card-container">
      <div className="post-card-header">
        <img
          src={
            post.user.profilePicture ||
            "https://i.pinimg.com/736x/79/8f/bf/798fbf62ba74a844ceeef90b83c76e59.jpg"
          }
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
        </p>
        <button
          className="post-card-view-comments"
          onClick={() => setModalOpen(true)}
        >
          Ver los {post.comments.length} comentarios
        </button>

        <p className="post-card-time">
          {new Date(post.createdAt).toLocaleTimeString()}
        </p>
      </div>

      {isModalOpen && (
        <CommentsModal
          post={post}
          setPosts={setPosts}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PostCard;
