import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./SideBar.css";

import feed from "../../Images/feed.png";
import perfil from "../../Images/perfil.png";
import search from "../../Images/search.png";

const SideBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado para Drawer
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 768px)"); // Verifica el tamaño de la pantalla
  const userId = localStorage.getItem("user-id");

  const handleNavigation = (text) => {
    switch (text) {
      case "Feed":
        navigate("/feed");
        break;
      case "My Profile":
        navigate(`/user/profile/${userId}`);
        break;
      case "Search":
        navigate("/search");
        break;
      case "Cerrar Sesión":
        localStorage.removeItem("jwt-token");
        navigate("/");
        break;
      default:
        break;
    }
    setDrawerOpen(false); // Cierra el Drawer al navegar
  };

  const menuItems = [
    {
      text: "Feed",
      icon: <img src={feed} alt="Feed" style={{ width: 24, height: 24 }} />,
    },
    {
      text: "My Profile",
      icon: <img src={perfil} alt="Perfil" style={{ width: 24, height: 24 }} />,
    },
    {
      text: "Search",
      icon: <img src={search} alt="Search" style={{ width: 24, height: 24 }} />,
    },
    { text: "Cerrar Sesión", icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {isSmallScreen ? (
        // Pantallas pequeñas: Mostrar botón para abrir el Drawer
        <>
          <IconButton
            color="inherit"
            className="sidebar-btn"
            aria-label="open sidebar"
            onClick={() => setDrawerOpen(true)}
            sx={{ position: "absolute", top: 16, left: 16 }}
            style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 999 }}
          >
            <MenuIcon />
          </IconButton>


          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ width: 250 }} role="presentation">
              <h2 style={{ padding: "16px", textAlign: "center" }}>
                Fakestagram
              </h2>
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton onClick={() => handleNavigation(item.text)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          </Drawer>
        </>
      ) : (
        // Pantallas grandes: Sidebar estático
        <Box
          className="sidebar"
          sx={{
            width: 250,
            height: "100vh", // Altura completa de la ventana
            borderRight: "1px solid #ddd",
          }}
        >
          <h2 style={{ padding: "16px", textAlign: "center" }}>Fakestagram</h2>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavigation(item.text)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
