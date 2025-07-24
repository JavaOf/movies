import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { SiVk } from "react-icons/si";
import { SiGmail } from "react-icons/si";
import { FaYandex } from "react-icons/fa";
import './login.scss';

export const Login = () => {
  return (
     <div className="login">
      <div className='container'>
        <div className="login__content">
          <form className='login__content__form'>
            <h2 className='login__content__form-title'>Войти</h2>
            <input className='login__content__form-input' type="email" placeholder='Введите ваш email' />
            <input className='login__content__form-input' type="password" placeholder='Введите пароль' />
            <div className="login__content__form__wrapper">
              <div class="checkbox-wrapper">
              <span className="login__content__form__wrapper-check"> забыли пароль?</span>
              </div>
            </div>
            <button className="login__content__form-btn" type='submit'>Войти</button>
            <button className="login__content__form-btn new"><FcGoogle/> Вход через Google</button>
            <button className="login__content__form-btn new"><SiVk/> Вход через VK</button>
            <button className="login__content__form-btn new"><SiGmail/> Вход через Gmail</button>
            <button className="login__content__form-btn new"><FaYandex/> Вход через Yandex</button>
            <span className="login__content__form-link">Нет аккаунта? <Link to={'/auth/register'}>Зарегистрироваться</Link></span>
            <span className="login__content__form-link">Связаться с поддержкой</span>
          </form>
        </div>
      </div>
    </div>
  )
}
