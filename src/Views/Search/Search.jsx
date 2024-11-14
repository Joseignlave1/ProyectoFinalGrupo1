import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../Services/api";
import CardSearch from "../../Components/SearchCard/SearchCard";
import "./search.css";
import SideBar from "../../Components/SideBar/SideBar";
import CssBaseline from "@mui/material/CssBaseline";
import {useNavigate} from "react-router-dom";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const profiles = await getAllUsers();
        setUsers(profiles);
        console.log(profiles);
      } catch (error) {
        console.error("Error fetching all profiles:", error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleSearch = async (e) => {
    e.preventDefault();
  };


  const handleClick = (userId) => {
    navigate(`/user/profile/${userId}`);
  }

  return (
    <>
      <CssBaseline />
      <SideBar />
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search profiles"
          />
        </form>
        <div className="search-results">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <CardSearch key={user._id} user={user} onClick={() => handleClick(user._id)} />)
          ) : (
            <p>No se encontraron perfiles.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;