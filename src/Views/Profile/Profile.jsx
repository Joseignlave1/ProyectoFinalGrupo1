import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import cr7 from "../../Images/cr7.png";
import foto from "../../Images/foto.png"
import foto1 from "../../Images/foto1.jpeg";
import foto2 from "../../Images/foto2.jpeg";
import "./profile.css";
import Modal from "../../Components/Example/Modal";
import UserPost from "../../Components/Example/UserPost";
import Post from "../../Components/Example/Post";
import { getProfileId } from "../../Services/api";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("user-id");

  useEffect(() => {
    if (id) {
      getProfileId(id).then((data) => setProfileInfo(data));
    }
  }, [id]);

  const alternarEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  const handleFeedClick = () => {
    navigate("/feed");
  };

  const handleOpenModal = (post) => {
    // Lógica para abrir el modal con el post seleccionado
  };

  const handleCloseModal = () => {
    // Lógica para cerrar el modal
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="profile">
          <header className="myprofile">
            {profileInfo ? (
              <>
                <div className="user_edit_container">
                  <img src={cr7} alt="" />
                  <p>{profileInfo.user.username}</p>
                  <button id="edit-profile-button">Edit Profile</button>
                </div>
                <div className="stats">
                  <p>{profileInfo.posts.length} Posts</p>
                  <p>{profileInfo.user.friends.length} Friends</p>
                </div>
              </>
            ) : (
              <div>Loading Profile</div>
            )}
          </header>
        </div>
      </Container>
      <Container maxWidth="sm" className="gallery_container">
        <img src={cr7} alt="" />
        <img src={foto} alt="" />
        <img src={foto1} alt="" />
        <img src={foto2} alt="" />
      </Container>
    </>
  );
};

export default Profile;
