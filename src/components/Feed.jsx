
import React from 'react';
import './Feed.css';

const Feed = () => {
  return (
    <div className="feed">
      <header className="feed-header">
        <h1>Fakestagram</h1>
        <div className="feed-actions">
          <i className="fas fa-heart"></i>
          <i className="fas fa-plus"></i>
        </div>
      </header>

      <div className="post">
        <div className="post-header">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="profile-pic"
          />
          <p className="post-username">FriendName</p>
          <i className="fas fa-ellipsis-h"></i>
        </div>

        <img
          src="https://via.placeholder.com/500x300"
          alt="Post content"
          className="post-img"
        />

        <div className="post-actions">
          <i className="far fa-heart"></i>
          <i className="far fa-comment"></i>
        </div>

        <div className="post-details">
          <p className="likes"><strong>33 Likes</strong></p>
          <p className="post-description">
            <strong>FriendName</strong> this is my friend’s post description...
            <span className="see-more">plus</span>
          </p>
          <p className="view-comments">Voir les 3 commentaires</p>
          <div className="comments">
            <p><strong>PersonName</strong> A comment post</p>
            <p className="response"><strong>Friend Name</strong> a response</p>
          </div>
          <p className="time">2 hs</p>
        </div>
      </div>

      <footer className="feed-footer">
        <i className="fas fa-home"></i>
        <img
          src="https://via.placeholder.com/30"
          alt="User profile"
          className="footer-profile-pic"
        />
      </footer>
    </div>
  );
};

export default Feed;