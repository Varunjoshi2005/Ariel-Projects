import { useUserContext } from "../context/UserContext";
import styles from "../styles/dashboard.module.css";
import { useState } from "react";
import LocationBox from "../modules/LocationBox";
import Navbar from "../components/TopBar";
function Dashboard() {
  const { user } = useUserContext();
  const [locationbox, setLocationBox] = useState<boolean>(false);

  return (
    <>
      {locationbox && <LocationBox toogleBox={setLocationBox} />}
      <div className={styles.dashboardContainer}>
        <Navbar />

        <main
          style={{
            width: "100vw",
            height: "100%",
            display: "flex",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span> HI Welcome {user.username}!!</span>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
