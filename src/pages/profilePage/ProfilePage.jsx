import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../app/store/auth/authSlice'; 
import './profilePage.scss';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(s => s.authSlice);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login'); 
  };

  return (
    <div className='profile'>
      <div className="container">
        <div className="profile__content">
          <h2 className="profile__content-title">{t('user_profile')}</h2>
          
          <div className="profile__content__wrapper">
            <label className="profile__content__wrapper-label">{t('username')}</label>
            <input
              type="text"
              value={user?.username || ''}
              readOnly
              className="profile__content__wrapper-input"
            />
          </div>
          
          <div className="profile__content__wrapper">
            <label className="profile__content__wrapper-label">{t('user_password')}</label>
            <input
              type="text"
              value={user?.password || ''}
              readOnly
              className="profile__content__wrapper-input"
            />
          </div>
          
          <div className="profile__content__wrapper">
            <label className="profile__content__wrapper-label">{t('user_mail')}</label>
            <input
              type="text"
              value={user?.email || ''}
              readOnly
              className="profile__content__wrapper-input"
            />
          </div>

          <button 
            type="button" 
            className="profile__content-logout-btn"
            onClick={handleLogout}
          >
            {t('logout') || 'Выйти'}
          </button>
        </div>
      </div>
    </div>
  );
};
