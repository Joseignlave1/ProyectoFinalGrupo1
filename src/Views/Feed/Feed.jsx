import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./feed.css";
import PostCard from "../../Components/Card/PostCard";
import { getFeed } from "../../Services/postServices";

const Feed = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("user-id");
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

  const handleNavigateToFeed = () => {
    navigate("/feed");
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
      <div className="posts">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            setPosts={setPosts} // Pasamos setPosts a PostCard
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
