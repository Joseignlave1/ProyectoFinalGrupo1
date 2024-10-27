import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./feed.css";
import PostCard from "../../Components/Card/PostCard";
import { getFeed, likePost } from "../../Services/postServices";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TemporaryDrawer from '../../Components/SideBar/SideBar';

const Feed = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('user-id');
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
      <TemporaryDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Container maxWidth="lg">
        <div className="feed">
          <header className="feed-header">
            <h1>Fakestagram</h1>
            <div className="feed-actions">
              <i className="fas fa-heart"></i>
              <i className="fas fa-plus"></i>
            </div>
            <button onClick={() => {navigate(`/user/profile/${id}`)}}>
              GO TO MY PROFILE
            </button>
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
        </div>
      </Container>
    </>
  );
};

export default Feed;
