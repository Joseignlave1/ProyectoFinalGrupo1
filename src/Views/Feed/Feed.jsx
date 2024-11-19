import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./feed.css";
import PostCard from "../../Components/Card/PostCard";
import { getFeed, likePost, removeLike } from "../../Services/postServices";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import SideBar from "../../Components/SideBar/SideBar";
import { getAllUsers } from "../../Services/api";
import ScrollCard from "../../Components/ScrollCard/ScrollCard";

const Feed = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("user-id");
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

  const handleNavigateToFeed = () => {
    navigate("/feed");
  };

  const handleClick = (userId) => {
    navigate(`/user/profile/${userId}`);
  }

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

  const fetchAllUsers = async () => {
    try {
      const profiles = await getAllUsers();
      setUsers(profiles);
      console.log(profiles);
    } catch (error) {
      console.error("Error fetching all profiles:", error);
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
    fetchAllUsers();
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Container
        maxWidth={false}
        style={{ padding: "1rem", margin: "0 auto", flexGrow: 1 }}
      >
        <CssBaseline />
        <div className="feed">
          <div className="scroll-container">
            {user.map((user) => (
              <ScrollCard key={user._id} user={user} onClick={() => handleClick(user._id)}/>
            ))}
          </div>
          <div className="posts">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} setPosts={setPosts} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Feed;
