import scss from "./Header.module.scss";

const Header = () => {
  return (
    <header className={scss.header}>
      <div className={scss.header_container}>
        <div className={scss.logo}>
          <a className={scss.logo_link} href="/">
            <img
              className={scss.logo_img}
              src="src/assets/logo.svg"
              alt="logo"
            />
            <p className={scss.logo_text}>kross store</p>
          </a>
        </div>
        <nav className={scss.nav}>
          <ul className={scss.menu}>
            <li className={scss.menu_item}>
              <a className={scss.link} href="/basket">
                <img
                  className={scss.menu_text}
                  src="src/assets/basket.svg"
                  alt="basket"
                />
                1205 som
              </a>
            </li>
            <li className={scss.menu_item}>
              <a className={scss.link} href="/favorites-products">
                <img src="src/assets/heart.svg" alt="heart" />
                Закладки
              </a>
            </li>
            <li className={scss.menu_item}>
              <a className={scss.link} href="/login">
                <img src="src/assets/login.svg" alt="login" />
                Профиль
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
