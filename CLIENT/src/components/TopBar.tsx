import React, { useState } from "react";
import "../styles/Navbar.css";
import styles from "../styles/dashboard.module.css";
import { useUserContext } from "../context/UserContext";
import { ChevronDown, UserCircle2Icon } from "lucide-react";
import LocationBox from "../modules/LocationBox";
import { ACTIONS } from "../types";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { user, dispatch, selectedState, selectedCountry } = useUserContext();

  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState<string>(`${selectedState != "" ? `${selectedCountry},${selectedState}` : "select your region"}`);


  const [locationbox, setLocationBox] = useState<boolean>(false);

  const handleLogoutUser = () => {
    dispatch({ type: ACTIONS.REMOVE_USER });
    localStorage.removeItem("user-details");
    navigate("/login");
  };

  return (
    <>
      {locationbox && <LocationBox toogleBox={setLocationBox} />}

      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="logo">MyApp</h1>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>
        </div>

        {user.role != "USER" && (
          <div
            onClick={() => setLocationBox((prev) => !prev)}
            className={styles.SelectRegion}
          >
            <span style={{ opacity: "0.5", padding: "5px" }}>
              {selectedRegion}
            </span>
            <ChevronDown />
          </div>
        )}

        <div className="navbar-right">
          {user ? (
            <div className="profile-container">
              <UserCircle2Icon
                onClick={() => setShowDropdown((prev) => !prev)}
                cursor={"pointer"}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <span>Hello, {user.username}</span>
                  <button onClick={handleLogoutUser}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="login-btn">
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
