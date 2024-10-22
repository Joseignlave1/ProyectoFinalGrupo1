import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "./profile.css";
import cr7 from "../../Images/cr7.png";

const Profile = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="profile">
          <header className="myprofile">
            <h1>UnUsername</h1>
            <img src={cr7} />
            <p className="username">Username</p>
            <p className="description">My profile description</p>
            <div className="stats">
              <span>
                <strong>153</strong> Posts
              </span>
              <span>
                <strong>209</strong> Friends
              </span>
            </div>
            <button className="edit-profile-btn">Edit profile</button>
          </header>
          <div className="gallery">{/* imagenes */}</div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
