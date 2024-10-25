import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import cr7 from "../../Images/cr7.png";
import "./profile.css";
import { useParams } from "react-router-dom";
import Modal from "../../Components/Example/Modal";
import UserPost from "../../Components/Example/UserPost";
import Post from "../../Components/Example/Post";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [postDescription, setPostDescription] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [friendCount, setFriendCount] = useState(0);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [userName, setUserName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/profile/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
          setFriends(data.user.friends);
          setPosts(data.posts);
          setFriendCount(data.user.friends.length);
          setPostCount(data.posts.length);
          setUserName(data.user.username);
          setDescripcion(data.user.description);
          setPhoto(data.user.profileImage);
        }
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  const alternarEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  const manejarGuardar = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/profile/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          profilePicture: photo,
        }),
      });

      if (response.ok) {
        const DataUser = await response.json();
        setUserData(DataUser.user);
        // setUserName(DataUser.nombreUsuario);
        // setDescripcion(DataUser.descripcion);
        // setPhoto(DataUser.fotoPerfil);
        setModoEdicion(false);
      } else {
        console.error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  const handleFeedClick = () => {
    navigate("/feed");
  };

  const handleOpenModal = (post) => {
    setPostDescription(post);
  };

  const handleCloseModal = () => {
    setPostDescription(null);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-pic">
              <img src={photo || "img"} alt="perfil" />
            </div>
            <div className="profile-info">
              <h1 className="nombreUsuario">{userName}</h1>
              <p className="descripcion">{descripcion}</p>
              <p>{userData?.createdAt}</p>
              <div className="profile-stats">
                <div>
                  <h5>Posts</h5>
                  <p>{postCount}</p>
                </div>
                <div>
                  <h5>Friends</h5>
                  <p>{friendCount}</p>
                </div>
              </div>
              <div className="profile-editBtn">
                <button onClick={alternarEdicion}>Edit Profile</button>
              </div>
            </div>
          </div>
          <div className="profile-posts">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post.id}
                  photo={post.imageUrl}
                  onClick={() => handleOpenModal(post)}
                />
              ))
            ) : (
              <p>No hay publicaciones</p>
            )}
          </div>
          {postDescription && (
            <Modal onClose={handleCloseModal}>
              <div className="modal-post">
                <UserPost
                  username={postDescription.user}
                  id={postDescription.id}
                  photo={postDescription.imageUrl}
                  caption={postDescription.caption}
                  comments={postDescription.comments.map(
                    (comment) => `${comment.user}: ${comment.text}`
                  )}
                  likes={postDescription.likes}
                  createdAt={postDescription.createdAt}
                  onClose={handleCloseModal}
                />
              </div>
            </Modal>
          )}
          {modoEdicion && (
            <>
              <div className="modal-overlay" onClick={alternarEdicion}></div>
              <div className="modal-edit-profile">
                <h2>Editar Perfil</h2>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Nombre de usuario"
                />
                {/* <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción"
                /> */}
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="Foto de perfil"
                />
                <button onClick={manejarGuardar}>Guardar</button>
              </div>
            </>
          )}
          <button onClick={handleFeedClick} className="back-to-feed-btn">
            Regresar al Feed
          </button>
        </div>
      </Container>
    </>
  );
};

export default Profile;
