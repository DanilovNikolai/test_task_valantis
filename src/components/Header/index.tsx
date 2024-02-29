import styles from "./Header.module.scss";
import logo from "../../assets/header_logo.svg";
import searchIcon from "../../assets/header_search.svg";
import cartIcon from "../../assets/header_cart.svg";
import bookmarkIcon from "../../assets/header_bookmark.svg";
import accountIcon from "../../assets/header_account.svg";

const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.tel_container}>
          <a href="tel:+79851349294">+7 (985) 134 92 94</a>
        </div>
        <div className={styles.logo_container}>
          <img src={logo} alt="valantis-logo" />
        </div>
        <div className={styles.icons_container}>
          <div>
            <a>
              <img src={searchIcon} alt="valantis-logo" />
            </a>
          </div>
          <div>
            <a>
              <img src={accountIcon} alt="valantis-logo" />
            </a>
          </div>
          <div>
            <a>
              <img src={bookmarkIcon} alt="valantis-logo" />
            </a>
          </div>
          <div>
            <a>
              <img src={cartIcon} alt="valantis-logo" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
