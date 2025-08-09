import { IoMdSearch } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { IoNotifications, IoMenu, IoLanguage } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "../../entities/search/Search";
import './header.scss';

export const Header = () => {
  const [active, setActive] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(false);
  const isRegistered = useSelector((state) => state.authSlice?.user);
  const [activeSearch, setActiveSearch] = useState(false);
  const { i18n, t } = useTranslation();

  const handleChangeLanguage = (lang) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    window.location.reload();
    setActiveLanguage(false);
  };

  const handleChangeSearch = () => {
    setActiveSearch(prev => !prev);
  }


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
          <span onClick={() => handleChangeSearch()} className="header__wrapper-search">
            <IoMdSearch />
          </span>
        </div>
          {activeSearch && (
            <Search onClick={() => handleChangeSearch()}/>
          )}
        <span onClick={() => setActive(!active)} className="header-menu">
          <IoMenu />
        </span>

        <div className={`header__wrapper header__wrapper--menu ${active ? 'show' : ''}`}>
          <a href="https://t.me/Lord090818" target="_blank" className="header__wrapper-telegram"><FaTelegram /></a>

          <span
            className={`header__wrapper-message ${activeLanguage ? 'active' : ''}`}
            onClick={() => setActiveLanguage(!activeLanguage)}
          >
            {activeLanguage && (
              <nav className="language__content">
                <ul>
                  <li >
                    <button onClick={() => handleChangeLanguage('en')} disabled={i18n.language === 'en'}>
                      English
                    </button>
                  </li>
                   <li >
                    <button onClick={() => handleChangeLanguage('ru')} disabled={i18n.language === 'ru'}>
                      Русский
                    </button>
                  </li>
                </ul>
              </nav>
            )}
            <IoLanguage />
          </span>

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
