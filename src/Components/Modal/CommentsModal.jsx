import React, { useState } from "react";
import "./CommentsModal.css";
import { createComment, removeComment } from "../../Services/api.js";

const CommentsModal = ({ post, setPosts, closeModal }) => {
  const userId = localStorage.getItem("user-id");
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const comment = await createComment(post._id, newComment);
      if (comment) {
        // Actualizamos el comentario para incluir el usuario actual
        const updatedComment = {
          ...comment,
          user: {
            _id: userId,
            username: localStorage.getItem("username"),
          },
        };

        // Actualizamos la lista de comentarios en el estado
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === post._id
              ? { ...p, comments: [...p.comments, updatedComment] }
              : p
          )
        );
        setNewComment(""); // Limpiar el input
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      await removeComment(post._id, commentId);
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === post._id
            ? { ...p, comments: p.comments.filter((c) => c._id !== commentId) }
            : p
        )
      );
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  return (
    <div className="comments-modal-backdrop" onClick={closeModal}>
      <div
        className="comments-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Comentarios</h2>
        <button className="close-modal" onClick={closeModal}>
          X
        </button>
        <div className="comments-list">
          {post.comments.map((comment) => (
            <p key={comment._id}>
              <strong>{comment.user?.username || "Usuario desconocido"}</strong>
              : {comment.content}
              {comment.user?._id === userId && (
                <button
                  className="post-card-button delete"
                  onClick={() => handleRemoveComment(comment._id)}
                >
                  Eliminar
                </button>
              )}
            </p>
          ))}
        </div>
        <div className="add-comment-section">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            className="comment-input"
          />
          <button onClick={handleAddComment} className="add-comment-button">
            Agregar comentario
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
