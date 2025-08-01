import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import registerSchema from '../utils/signSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/store/auth/authThunk'; 
import { useEffect } from 'react';
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

  useEffect(() => {
    if (isRegistered) {
      navigate('/');
    }
  }, [isRegistered, navigate]);

  const handleRegisterSubmit = (data) => {
    dispatch(registerUser(data));
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
            <h2 className='register__content__form-title'>Зарегистрироваться</h2>
            <div className="register__content__form-box">
              <input
                {...register('username')}
                className={`register__content__form-box-input ${errors?.username ? 'err' : ''}`}
                type="text"
                placeholder='Введите ваш ник'
              />
              {errors?.username && <p className="error">{errors?.username?.message}</p>}
            </div>
            <div className="register__content__form-box">
              <input
                {...register('email')}
                className={`register__content__form-box-input ${errors?.email ? 'err' : ''}`}
                type="email"
                placeholder='Введите ваш email'
              />
              {errors?.email && <p className="error">{errors?.email?.message}</p>}
            </div>
            <div className="register__content__form-box">
              <input
                {...register('password')}
                className={`register__content__form-box-input ${errors?.password ? 'err' : ''}`}
                type="password"
                placeholder='Введите пароль'
              />
              {errors?.password && <p className="error">{errors?.password?.message}</p>}
            </div>
            <div className="register__content__form-box">
              <input
                {...register('password_confirm')}
                className={`register__content__form-box-input ${errors?.password_confirm ? 'err' : ''}`}
                type="password"
                placeholder='Повторите пароль'
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
                <label className="checkbox" htmlFor="checkbox-filled-ripple"><span>
                  <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg></span>
                </label>
              </div>
              <span className="register__content__form__wrapper-check"> Я принимаю условия</span>
            </div>
            {errors?.acceptTerms && <p className="error">{errors?.acceptTerms?.message}</p>}
            <button className="register__content__form-btn" type='submit' disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
            <span className="register__content__form-link">У меня есть аккаунт? <Link to={'/auth/login'}>Войти</Link></span>
          </form>
        </div>
      </div>
    </div>
  );
};