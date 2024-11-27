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
import { unfollowUser } from "../../Services/postServices";
import PostCard from "../../Components/Card/PostCard";
//
const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const loggedInUserId = localStorage.getItem("user-id");
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const isLoggedUserProfile = loggedInUserId === id;

  useEffect(() => {
    if (id) {
      getProfileId(id)
        .then((data) => {
          console.log(data.user);
          setProfileInfo(data);
          setIsFollowing(
            data.user.friends.some((friend) => friend._id === loggedInUserId)
          );
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [id, loggedInUserId]);

  const alternarEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  const manejarGuardar = async () => {

    let updatedProfilePicture = profileInfo.user.profilePicture;

  if (imagenSeleccionada) {
    // Crear un FormData para enviar la imagen al backend
    const formData = new FormData();
    formData.append("image", imagenSeleccionada);

    try {
      const response = await fetch("http://localhost:3001/api/posts/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Si usas autenticación
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updatedProfilePicture = data.filePath; // Guardar la URL de la imagen devuelta
      } else {
        throw new Error("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return; // Detener si la subida falla
    }
  }
    if (profileInfo) {

      const { username, description} = profileInfo.user;
      const updatedUsername = username.trim() !== "" ? username : " ";
      const updatedDescription = description.trim() !== "" ? description : " ";
      

      saveUserProfile(
        updatedUsername,
        updatedDescription,
         updatedProfilePicture
      )
        .then((updatedProfile) => {
          setProfileInfo(updatedProfile);
          getProfileId(id)
            .then((data) => {
              setProfileInfo(data);
              setIsFollowing(
                data.user.friends.some(
                  (friend) => friend._id === loggedInUserId
                )
              );
            })
            .catch((error) => {
              console.error("Error fetching profile data:", error);
            });
        })
        .catch((error) => {
          console.error("Error saving profile data:", error);
        });
    }
    setModoEdicion(false);
  };

  const seguirPerfil = () => {
    if (
      profileInfo.user.friends.some((friend) => friend._id === loggedInUserId)
    ) {
      console.log("Ya sigues a este usuario");
      return;
    }
    followUser(id)
      .then((data) => {
        console.log(data);
        setProfileInfo((prevInfo) => ({
          ...prevInfo,
          user: {
            ...prevInfo.user,
            friends: [...prevInfo.user.friends, { _id: loggedInUserId }],
          },
        }));
        setIsFollowing(true);
      })
      .catch((error) => {
        console.error("Error al seguir usuario:", error);
      });
  };

  const unfollowProfile = () => {
    unfollowUser(id)
      .then((data) => {
        console.log(data);
        setIsFollowing(false);
        setProfileInfo((prevInfo) => ({
          ...prevInfo,
          user: {
            ...prevInfo.user,
            friends: prevInfo.user.friends.filter(
              (friend) => friend._id !== loggedInUserId
            ),
          },
        }));
      })
      .catch((error) => {
        console.error("Error al dejar de seguir usuario:", error);
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

  //const isFollowing = profileInfo.user.friends && profileInfo.user.friends.includes(loggedInUserId);

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
                  profileInfo.user.profilePicture ?  `http://localhost:3001${profileInfo.user.profilePicture}` :
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
                    <button
                      onClick={isFollowing ? unfollowProfile : seguirPerfil}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
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
                      : 0} Friends
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
                type="file"
                accept="image/*"
                onChange={(e) => setImagenSeleccionada(e.target.files[0])}
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
                  setPosts={(updatedPosts) => setProfileInfo({ ...profileInfo, posts: updatedPosts })}
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
