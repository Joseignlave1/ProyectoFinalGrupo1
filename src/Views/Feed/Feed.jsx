import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./feed.css";
import PostCard from "../../Components/Card/PostCard";
import { getFeed, likePost, removeLike } from "../../Services/postServices";
import { createComment, removeComment } from "../../Services/api"; // Importar los métodos de comentarios
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import SideBar from "../../Components/SideBar/SideBar";

const Feed = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("user-id");
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

  const handleNavigateToFeed = () => {
    navigate("/feed");
  };

  const handleLikePost = async (postId) => {
    try {
      const post = posts.find((p) => p._id === postId);
      let updatedPost;
      if (post.likes.includes(id)) {
        updatedPost = await removeLike(postId);
      } else {
        updatedPost = await likePost(postId);
      }
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Error al dar o quitar like:", error);
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <CssBaseline />
      <SideBar />
      <Container maxWidth="lg">
        <div className="feed"></div>
        <div className="posts">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              setPosts={setPosts}
              createComment={createComment} // Pasar createComment como prop
              removeComment={removeComment} // Pasar removeComment como prop
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Feed;
