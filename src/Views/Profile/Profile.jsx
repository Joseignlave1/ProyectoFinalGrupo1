import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import UserPost from "../../Components/UserPost/UserPost";
import Post from "../../Components/Post/Post";
import { getProfileId } from "../../Services/api";
import { saveUserProfile } from "../../Services/postServices";
import "./profile.css";
import { useParams } from "react-router-dom";
import { followUser } from "../../Services/postServices";
import SideBar from "../../Components/SideBar/SideBar";
import defaultImage from "../../Images/defaultImage.jpg";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("user-id");
  const { id } = useParams();

  const isLoggedUserProfile = loggedInUserId === id;

  useEffect(() => {
    if (id) {
      getProfileId(id)
        .then((data) => {
          setProfileInfo(data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [id]);

  const alternarEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  const manejarGuardar = () => {
    if (profileInfo) {
      saveUserProfile(
        profileInfo.user.username,
        profileInfo.user.description,
        profileInfo.user.profilePicture
      )
        .then((updatedProfile) => {
          setProfileInfo(updatedProfile);
          setModoEdicion(false);
          // Actualizar los posts después de guardar el perfil
          getProfileId(id)
            .then((data) => {
              setProfileInfo(data);
            })
            .catch((error) => {
              console.error("Error fetching profile data:", error);
            });
        })
        .catch((error) => {
          console.error("Error saving profile data:", error);
        });
    }
  };

  const seguirPerfil = () => {
    followUser(id)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al seguir usuario:", error);
      });
  };

  const handleLikeChange = (updatedPost) => {
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      posts: prevInfo.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      ),
    }));
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  if (!profileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <SideBar />
      <Container maxWidth="lg" style={{ position: "relative" }}>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-pic">
              <img
                src={
                  profileInfo.user.profilePicture ||
                  "https://i.pinimg.com/736x/79/8f/bf/798fbf62ba74a844ceeef90b83c76e59.jpg"
                }
                alt="perfil"
              />
            </div>
            <div className="profile-info">
              <div className="profile-line">
                <h1 className="nombreUsuario">{profileInfo.user.username}</h1>
                {isLoggedUserProfile ? (
                  <div className="profile-editBtn">
                    <button onClick={alternarEdicion}>Edit Profile</button>
                  </div>
                ) : (
                  <div className="profile-editBtn">
                    <button onClick={seguirPerfil}>Seguir</button>
                  </div>
                )}
              </div>
              <div className="profile-stats">
                <div className="countPosts">
                  <h5>
                    {profileInfo.posts ? profileInfo.posts.length : 0} Posts
                  </h5>
                </div>
                <div>
                  <h5>
                    {profileInfo.user.friends
                      ? profileInfo.user.friends.length
                      : 0}{" "}
                    Following
                  </h5>
                </div>
              </div>
              <p className="descripcion">{profileInfo.user.description}</p>
            </div>
          </div>
          {modoEdicion && (
            <>
              <div className="modal-overlay" onClick={alternarEdicion}></div>
              <div className="modal-edit-profile">
                <h2>Editar Perfil</h2>
                <input
                  type="text"
                  value={profileInfo.user.username}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      user: { ...profileInfo.user, username: e.target.value },
                    })
                  }
                  placeholder="Nombre de usuario"
                />
                <input
                  type="text"
                  value={profileInfo.user.description}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      user: {
                        ...profileInfo.user,
                        description: e.target.value,
                      },
                    })
                  }
                  placeholder="Descripción"
                />
                <input
                  type="text"
                  value={profileInfo.user.profilePicture}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      user: {
                        ...profileInfo.user,
                        profilePicture: e.target.value,
                      },
                    })
                  }
                  placeholder="Foto de perfil"
                />
                <button onClick={manejarGuardar}>Guardar</button>
              </div>
            </>
          )}
          {/* Publicaciones del perfil */}
          <div className="profile-posts">
            {profileInfo.posts && profileInfo.posts.length > 0 ? (
              profileInfo.posts.map((post) => (
                <Post
                  key={post.id}
                  photo={post.imageUrl}
                  onClick={() => handleOpenModal(post)}
                />
              ))
            ) : (
              <div className="no-posts-placeholder">
                <p>No hay publicaciones</p>
              </div>
            )}
          </div>
          {/* Modal para el post seleccionado */}
          {selectedPost && (
            <div className="modal-overlay" onClick={handleCloseModal}>
              <div className="modal-content">
                <UserPost
                  post={selectedPost}
                  id={isLoggedUserProfile}
                  onClose={handleCloseModal}
                  onLikeChange={handleLikeChange}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Profile;
