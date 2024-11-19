import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

import feed from "../../Images/feed.png";
import perfil from "../../Images/perfil.png";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import search from "../../Images/search.png";

const SideBar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user-id');

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
      text:"Search",
      icon: <img src={search} alt="Search" style={{ width: 24, height: 24 }} />,
    },
    { text: "Cerrar Sesión", icon: <LogoutIcon /> },
  ];

  return (
    <div className="sidebar">
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
    </div>
  );
};

export default SideBar;
