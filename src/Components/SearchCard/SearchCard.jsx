import React from "react";
import "./searchCard.css";

const SearchCard = ({ user, onClick }) => {
  return (
    <div className="card-search" onClick={onClick}>
      <img src={user.profilePicture || "https://i.pinimg.com/736x/79/8f/bf/798fbf62ba74a844ceeef90b83c76e59.jpg"} alt="perfil" />
      <div className="card-info">
        <h3>{user.username}</h3>
      </div>
    </div>
  );
};

export default SearchCard;