import React from "react";
import Modal from "./Modal";

const UserPost = ({ photo, caption, comments, likes, createdAt, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="user-post">
        <img src={photo} alt="Post" />
        <h3>{caption}</h3>
        <p><strong>Likes:</strong> {likes}</p>
        <p><strong>Comments:</strong></p>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <p><strong>Posted on:</strong> {createdAt}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default UserPost;