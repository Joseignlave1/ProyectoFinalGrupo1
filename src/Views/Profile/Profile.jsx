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
      <Container maxWidth="lg">
        <div className="profile-container">
          {/* Header del perfil */}
          <div className="profile-header">
            <div className="profile-pic">
              <img src={cr7} alt="perfil" />
            </div>
            {profileInfo ? (
              <div className="profile-info">
                <h1 className="nombreUsuario">{profileInfo.user.username}</h1>
                <p className="descripcion">
                  {profileInfo.user.description || "No description provided"}
                </p>
                <div className="profile-stats">
                  <div>
                    <h5>Posts</h5>
                    <p>{profileInfo.posts.length}</p>
                  </div>
                  <div>
                    <h5>Friends</h5>
                    <p>{profileInfo.user.friends.length}</p>
                  </div>
                </div>
                <div className="profile-editBtn">
                  <button onClick={alternarEdicion}>Edit Profile</button>
                </div>
              </div>
            ) : (
              <p>Cargando profile...</p>
            )}
          </div>

          {/* Publicaciones del perfil */}
          <div className="profile-posts">

          
          </div>
          {/* Botón de regreso al feed */}
          <button onClick={handleFeedClick} className="back-to-feed-btn">
            Regresar al Feed
          </button>
        </div>
      </Container>
    </>
  );
};

export default Profile;
