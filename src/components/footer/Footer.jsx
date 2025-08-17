import React from 'react';
import './footer.scss';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className='footer container'>
            <div className="footer__content">
                <nav className="footer__content__wrapper">
                    <h1 className="footer__content__wrapper-title">{t('movies')}</h1>
                </nav>
                <nav className="footer__content__wrapper">
                    <span className="footer__content__wrapper-link">
                        {t('my_mail')}: <a href="mailto:vmmuminov209@gmail.com">mmuminov209@gmail.com</a>
                    </span>
                    <span className="footer__content__wrapper-link">
                        {t('my_telegram')}: <a href="https://t.me/Eievdkb"
                            target="_blank"
                            rel="noopener noreferrer">@Eievdkb</a>
                    </span>
                    <span className="footer__content__wrapper-link">
                        {t('my_phone')}: <a href="tel:+16302776229">+1 (630) 27-76-229</a>
                    </span>
                </nav>
            </div>
        </footer>
    );
}


