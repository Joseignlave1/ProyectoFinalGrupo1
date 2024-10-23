import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import cr7 from "../../Images/cr7.png";
import "./profile.css";

const Profile = () => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("NombreUsuario");
  const [descripcion, setDescripcion] = useState("Descripción de mi perfil");
  const [fotoPerfil, setFotoPerfil] = useState(cr7);
  const navigate = useNavigate();

  const alternarEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  //Todo el manejarGuardar es provicional, faltan aclarar los datos que se actualizan
  const manejarGuardar = async () => {
    try {
      // Falta agregar la API
      const response = await fetch("", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario,
          descripcion,
          fotoPerfil,
        }),
      });

      if (response.ok) {
        setModoEdicion(false);
      } else {
        console.error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Función para navegar a la Feed
  const handleFeedClick = () => {
    navigate("/feed");
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="profile">
          <header className="myprofile">
            <h1>{nombreUsuario}</h1>
            <img src={fotoPerfil} alt="Foto de perfil" />
            {modoEdicion ? (
              <div>
                <input
                  type="text"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  placeholder="Nombre de usuario"
                />
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción"
                />
              </div>
            ) : (
              <>
                <p className="username">{nombreUsuario}</p>
                <p className="description">{descripcion}</p>
              </>
            )}
            <div className="stats">
              <span>
                <strong>153</strong> Publicaciones
              </span>
              <span>
                <strong>209</strong> Amigos
              </span>
            </div>
            {modoEdicion ? (
              <button onClick={manejarGuardar} className="save-profile-btn">
                Guardar
              </button>
            ) : (
              <button onClick={alternarEdicion} className="edit-profile-btn ">
                Editar perfil
              </button>
            )}
            <button onClick={handleFeedClick} className="back-to-feed-btn">
              Regresar al Feed
            </button>
          </header>

          <div className="gallery">{/* Falta implementar */}</div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
