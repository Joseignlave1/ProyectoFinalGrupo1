import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./feed.css";
import PostCard from "../../Components/Card/PostCard";
import { getFeed, likePost } from "../../Services/postServices";

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

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await likePost(postId);
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
        const data = await getFeed();
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener el feed:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <button className="cerrarSesion" onClick={handleLogout}>
        Cerrar Sesión
      </button>
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
