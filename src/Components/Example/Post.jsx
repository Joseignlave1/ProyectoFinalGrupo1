import React from "react";

const Post = ({ photo, onClick }) => {
  return (
    <div className="post" onClick={onClick}>
      <img src={photo} alt="post" className="post-image" />
    </div>
  );
};

export default Post;