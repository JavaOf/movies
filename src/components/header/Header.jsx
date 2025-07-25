import { IoMdSearch } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { IoNotifications, IoMenu } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import './header.scss';

export const Header = () => {
    const [active, setActive] = useState(false);
    const isRegistered = useSelector(state => state.authSlice?.user);

    const handleActive = () => {
        setActive(prev => !prev);
    };


    return (
        <header className='header'>
            <div className="container header__parent">
                <div className="header__wrapper">
                    <Link to={'/'} className="header__wrapper-logo">Movies</Link>
                </div>
                <div className="header__wrapper header__wrapper--desktop">
                    <Link to="/" className="header__wrapper-link">Home</Link>
                    <span className="header__wrapper-search"><IoMdSearch /></span>
                </div>
                <span onClick={handleActive} className="header-menu"><IoMenu /></span>
                <div className={`header__wrapper header__wrapper--menu ${active ? 'show' : ''}`}>
                    <span className="header__wrapper-telegram"><FaTelegram /></span>
                    <span className="header__wrapper-message"><LuMessagesSquare /></span>
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
    )
}
