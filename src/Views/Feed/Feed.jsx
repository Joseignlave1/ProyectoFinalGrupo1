import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./feed.css";
import PostCard from "../../Components/Card/PostCard";

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

  const handleNavigateToFeed = () => {
    navigate("/feed");
  };

  // Método para dar like a un post
  const handleLikePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Asegúrate de incluir el token
        },
      });

      if (!response.ok) {
        throw new Error("Error al dar like al post");
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/feed");

      if (!response.ok) {
        throw new Error("Error al obtener el feed");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error al obtener el feed:", error);
    }
  };

  fetchPosts();
}, []);

  return (
    <div className="feed">
      <button className="cerrarSesion" onClick={handleLogout}>Cerrar Sesion</button>
      <header className="feed-header">
        <h1>Fakestagram</h1>
        <div className="feed-actions">
          <i className="fas fa-heart"></i>
          <i className="fas fa-plus"></i>
        </div>
      </header>

      <div className="posts">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => handleLikePost(post.id)}
          />
        ))}
      </div>

      <footer className="feed-footer">
        <button onClick={handleNavigateToFeed} className="footer-button">
          <i className="butonFeed"></i>
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/profile")} className="footer-button">
          <i className="butonPerfil"></i>
          <span>Profile</span>
        </button>
      </footer>
    </div>
  );
};

export default Feed;
