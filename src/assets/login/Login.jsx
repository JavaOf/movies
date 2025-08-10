import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../utils/loginShema';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/store/auth/authThunk';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from "react-icons/fc";
import { SiVk, SiGmail } from "react-icons/si";
import { FaYandex } from "react-icons/fa";
import './login.scss';

export const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(s => s.authSlice);
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = (data) => {
    dispatch(loginUser(data));
    reset();
  };

  return (
    <div className="login">
      <div className='container'>
        <div className="login__content">
          {error && <p className="error global-error">{error}</p>}
          <form className='login__content__form' onSubmit={handleSubmit(handleLoginSubmit)}>
            <h2 className='login__content__form-title'>{t('login')}</h2>

            <div className="login__content__form-box">
              <input
                {...register('email')}
                className={`login__content__form-input ${errors?.email ? 'err' : ''}`}
                type="email"
                placeholder={t('enter_your_email')}
              />
              {errors?.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="login__content__form-box">
              <input
                {...register('password')}
                className={`login__content__form-input ${errors?.password ? 'err' : ''}`}
                type="password"
                placeholder={t('enter_your_password')}
              />
              {errors?.password && <p className="error">{errors.password.message}</p>}
            </div>

            <div className="login__content__form__wrapper">
              <span className="login__content__form__wrapper-check">{t('forgot_password')}</span>
            </div>

            <button className="login__content__form-btn" type='submit' disabled={loading}>
              {loading ? t('login_loading') : t('login')}
            </button>

            <button className="login__content__form-btn new" type="button"><FcGoogle/> Google</button>
            <button className="login__content__form-btn new" type="button"><SiVk/> VK</button>
            <button className="login__content__form-btn new" type="button"><SiGmail/> Gmail</button>
            <button className="login__content__form-btn new" type="button"><FaYandex/> Yandex</button>

            <span className="login__content__form-link">{t('no_account')}? <Link to={'/auth/register'}>{t('register')}</Link></span>
            <span className="login__content__form-link">{t('contact_support')}</span>
          </form>
        </div>
      </div>
    </div>
  );
};
