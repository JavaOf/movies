import React from 'react';
import './footer.scss';

export const Footer = () => {
    return (
        <footer className='footer container'>
            <div className="footer__content">
                <nav className="footer__content__wrapper">
                    <h1 className="footer__content__wrapper-title">Movies</h1>
                </nav>
                <nav className="footer__content__wrapper">
                    <span className="footer__content__wrapper-link">
                        Моя почта: <a href="mailto:vistus707@gmail.com">vistus707@gmail.com</a>
                    </span>
                    <span className="footer__content__wrapper-link">
                        Мой телеграм: <a href="https://t.me/Lord090818"
                            target="_blank"
                            rel="noopener noreferrer">@Lord090818</a>
                    </span>
                    <span className="footer__content__wrapper-link">
                        Мой номер: <a href="tel:+996990797374">+996 (990) 79-73-74</a>
                    </span>
                </nav>
            </div>
        </footer>
    );
}


