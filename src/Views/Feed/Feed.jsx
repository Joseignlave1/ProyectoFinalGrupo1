import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./feed.css";
import PostCard from "../../Components/Card/PostCard";
import { getFeed, likePost } from "../../Services/postServices";
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
            <PostCard key={post._id} post={post} setPosts={setPosts} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Feed;
