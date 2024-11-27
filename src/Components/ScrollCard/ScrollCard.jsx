import React from "react";
import "./scrollCard.css";

const ScrollCard = ({ user, onClick }) => {
  return (
    <div className="card-scroll">
      <img src={user.profilePicture || "https://i.pinimg.com/736x/79/8f/bf/798fbf62ba74a844ceeef90b83c76e59.jpg"} alt="perfil" />
      <div className="card-info">
        <h3>{user.username}</h3>
        <button className="viewButton" onClick={onClick}>View</button>
      </div>
    </div>
  );
};

export default ScrollCard;