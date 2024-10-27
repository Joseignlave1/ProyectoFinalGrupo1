import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import "./SideBar.css";


import feed from "../../Images/feed.png";
import perfil from "../../Images/perfil.png";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import menu from "../../Images/menu.png";

export default function TemporaryDrawer({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user-id');

  const handleNavigation = (text) => {
    switch (text) {
      case "Feed":
        navigate("/feed");
        break;
      case "Mi Perfil":
        navigate(`/user/profile/${userId}`);
        break;
      case "Cerrar Sesión":
        localStorage.removeItem("jwt-token");
        navigate("/");
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      text: "Feed",
      icon: <img src={feed} alt="Feed" style={{ width: 24, height: 24 }} />,
    },
    {
      text: "Mi Perfil",
      icon: <img src={perfil} alt="Perfil" style={{ width: 24, height: 24 }} />,
    },
    { text: "Cerrar Sesión", icon: <LogoutIcon /> },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <h2 style={{ padding: '16px', textAlign: 'center' }}>Fakestagram</h2>
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
  );

  return (
    <>
      <button onClick={toggleDrawer(true)} className="menu-button">
        <img src={menu} alt="Menu" className="menu-image" />
      </button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
