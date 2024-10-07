import React from 'react';
import './Myprofile.css';

const MyProfile = () => {
    return (
        <div className="profile">
            <header className="myprofile">
                <h1>UnUsername</h1>
                <img 
        
                />
                <p className="username">Username</p>
                <p className="description">My profile description</p>
                <div className="stats">
                    <span><strong>153</strong> Posts</span>
                    <span><strong>209</strong> Friends</span>
                </div>
                <button className="edit-profile-btn">Edit profile</button>
            </header>
            <div className="gallery">
                {/* imagenes */}

            </div>
        </div>
    );
};

export default MyProfile;
