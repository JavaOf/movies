import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/store/auth/authThunk';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import registerSchema from '../utils/signSchema';
import './register.scss';

export const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });
  const dispatch = useDispatch();
  const isRegistered = useSelector(s => s.authSlice.isRegistered);
  const loading = useSelector(s => s.authSlice.loading);
  const error = useSelector(s => s.authSlice.error);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isRegistered) {
      navigate('/');
    }
  }, [isRegistered, navigate]);

  const handleRegisterSubmit = (data) => {
    dispatch(registerUser(data));
    reset();
  };

  return (
    <div className="register">
      <div className='container'>
        <div className="register__content">
          {error && <p className="error global-error">{error}</p>}
          <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            className='register__content__form'
          >
            <h2 className='register__content__form-title'>{t('register')}</h2>

            <div className="register__content__form-box">
              <input
                {...register('username')}
                className={`register__content__form-box-input ${errors?.username ? 'err' : ''}`}
                type="text"
                placeholder={t('enter_your_nickname')}
              />
              {errors?.username && <p className="error">{errors?.username?.message}</p>}
            </div>

            <div className="register__content__form-box">
              <input
                {...register('email')}
                className={`register__content__form-box-input ${errors?.email ? 'err' : ''}`}
                type="email"
                placeholder={t('enter_your_email')}
              />
              {errors?.email && <p className="error">{errors?.email?.message}</p>}
            </div>

            <div className="register__content__form-box">
              <input
                {...register('password')}
                className={`register__content__form-box-input ${errors?.password ? 'err' : ''}`}
                type="password"
                placeholder={t('create_a_password')}
              />
              {errors?.password && <p className="error">{errors?.password?.message}</p>}
            </div>

            <div className="register__content__form-box">
              <input
                {...register('password_confirm')}
                className={`register__content__form-box-input ${errors?.password_confirm ? 'err' : ''}`}
                type="password"
                placeholder={t('confirm_your_password')}
              />
              {errors?.password_confirm && <p className="error">{errors?.password_confirm?.message}</p>}
            </div>

            <div className="register__content__form__wrapper">
              <div className="checkbox-wrapper">
                <input
                  className="input"
                  id="checkbox-filled-ripple"
                  type="checkbox"
                  {...register('acceptTerms')}
                />
                <label className="checkbox" htmlFor="checkbox-filled-ripple">
                  <span>
                    <svg viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                </label>
              </div>
              <span className="register__content__form__wrapper-check">
                {t('i_accept_the_terms')}
              </span>
            </div>

            {errors?.acceptTerms && <p className="error">{errors?.acceptTerms?.message}</p>}

            <button className="register__content__form-btn" type='submit' disabled={loading}>
              {loading ? t('registration_loading') : t('register')}
            </button>

            <span className="register__content__form-link">
              {t('you_already_have_an_account')} <Link to={'/auth/login'}>{t('login')}</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
