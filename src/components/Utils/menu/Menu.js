import Card from "../Card/Card";
import "./menu.css";
import styles from "./_menu.module.scss";
import logo from "../../Images/logo-removebg-preview.png";
import { NavLink } from "react-router-dom";
import {
  FileKey,
  ShieldQuestion,
  PercentCircle,
  FolderCog,
  BookUser,
  BadgeIndianRupee,
} from "lucide-react";

function Menu() {
  const activeLinkStyle = {
    // color: " hsl(195, 74%, 62%)",
  };
  return (
    <Card className={styles.menu}>
      <div>
        <img src={logo} alt="Edvitron" className={styles.logo}></img>
      </div>
      <div className={styles.menuBar_container}>
        <nav className={styles.menu_bar}>
          <ul>
            <li>
              <NavLink to="/homePage/dashboard" activeClassName="active">
                <div className={styles.icon}>
                  <div className={styles.icon_container}>
                    <FileKey className={styles.lucide_icon} />
                  </div>
                  <h3>Dashboard</h3>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/homePage/feeManagement"
                activeStyle={styles.activeLinkStyle}
              >
                <div className={styles.icon}>
                  <div className={styles.icon_container}>
                    <BadgeIndianRupee className={styles.lucide_icon} />
                  </div>
                  <h3>Fee Management</h3>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/homePage/student" activeStyle={activeLinkStyle}>
                <div className={styles.icon}>
                  <div className={styles.icon_container}>
                    <BookUser className={styles.lucide_icon} />
                  </div>
                  <h3>Student</h3>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/homePage/Disbursal" activeStyle={activeLinkStyle}>
                <div className={styles.icon}>
                  <div className={styles.icon_container}>
                    <FolderCog className={styles.lucide_icon} />
                  </div>
                  <h3>Disbursal</h3>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/homePage/promote" activeStyle={activeLinkStyle}>
                <div className={styles.icon}>
                  <div className={styles.icon_container}>
                    <PercentCircle className={styles.lucide_icon} />
                  </div>
                  <h3>Promote</h3>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/homePage/help" activeStyle={activeLinkStyle}>
                <div className={styles.icon}>
                  <div className={styles.icon_container}>
                    <ShieldQuestion className={styles.lucide_icon} />
                  </div>
                  <h3>Help</h3>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </Card>
  );
}

export default Menu;
