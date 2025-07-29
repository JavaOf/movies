import { IoMdSearch } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { IoNotifications, IoMenu, IoLanguage } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import './header.scss';

export const Header = () => {
  const [active, setActive] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(false);
  const isRegistered = useSelector((state) => state.authSlice?.user);
  const { i18n, t } = useTranslation();

  const handleChangeLanguage = (lang) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    window.location.reload();
    setActiveLanguage(false);
  };

  return (
    <header className='header'>
      <div className="container header__parent">
        <div className="header__wrapper">
          <Link to='/' className="header__wrapper-logo">{t('movies')}</Link>
        </div>

        <div className="header__wrapper header__wrapper--desktop">
          <Link to="/" className="header__wrapper-link">
            {t('home')}
          </Link>
          <span className="header__wrapper-search max">
            <IoLanguage />
          </span>
          <span className="header__wrapper-search">
            <IoMdSearch />
          </span>
        </div>

        <span onClick={() => setActive(!active)} className="header-menu">
          <IoMenu />
        </span>

        <div className={`header__wrapper header__wrapper--menu ${active ? 'show' : ''}`}>
          <span className="header__wrapper-telegram"><FaTelegram /></span>

          <span
            className={`header__wrapper-message ${activeLanguage ? 'active' : ''}`}
            onClick={() => setActiveLanguage(!activeLanguage)}
          >
            {activeLanguage && (
              <nav className="language__content">
                <ul>
                  <li onClick={() => handleChangeLanguage('en')}>English</li>
                  <li onClick={() => handleChangeLanguage('ru')}>Русский</li>
                </ul>
              </nav>
            )}
            <IoLanguage />
          </span>

          <span className="header__wrapper-notification"><IoNotifications /></span>
          <span className="header__wrapper-search max"><IoMdSearch /></span>

          <Link
            to={isRegistered ? '/auth/profile' : '/auth/register'}
            className="header__wrapper-account"
          >
            <MdAccountCircle />
          </Link>
        </div>
      </div>
    </header>
  );
};
