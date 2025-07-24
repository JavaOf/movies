import { useSelector } from 'react-redux';
import './profilePage.scss';

export const ProfilePage = () => {
    const { user } = useSelector(s => s.authSlice);

    console.log(user);
    return (
        <div className='profile'>
            <div className="container">
                <div className="profile__content">
                    <h2 className="profile__content-title">Профиль пользователя</h2>
                    <div className="profile__content__wrapper">
                        <label className="profile__content__wrapper-label">Имя пользователя</label>
                        <input
                            type="text"
                            value={user?.username}
                            readOnly
                            className="profile__content__wrapper-input"
                        />
                    </div>
                    <div className="profile__content__wrapper">
                        <label className="profile__content__wrapper-label">Пароль пользователя</label>
                        <input
                            type="text"
                            value={user?.password}
                            readOnly
                            className="profile__content__wrapper-input"
                        />
                    </div>
                    <div className="profile__content__wrapper">
                        <label className="profile__content__wrapper-label">Почта пользователя</label>
                        <input
                            type="text"
                            value={user?.email}
                            readOnly
                            className="profile__content__wrapper-input"
                        />
                    </div>
                
                </div>
            </div>
        </div>
    )
}
