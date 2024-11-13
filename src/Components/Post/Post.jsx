import React from "react";
import defaultImage from "../../Images/defaultImage.jpg";

const Post = ({ photo, onClick }) => {
  return (
    <div className="post" onClick={onClick}>
      <img src={`http://localhost:3001/${photo}`} alt="post" className="post-image"/>
    </div>
  );
};

export default Post;