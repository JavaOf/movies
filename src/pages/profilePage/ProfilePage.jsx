import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './profilePage.scss';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useSelector(s => s.authSlice);

  console.log(user);
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
        </div>
      </div>
    </div>
  );
};
