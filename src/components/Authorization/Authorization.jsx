import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/headerLogo.svg";
import { useForm } from 'react-hook-form'
import { REGISTRATION_TEXTS, LOGIN_TEXTS } from "../../utils/utils";

import "./Authorization.css";

export default function Authorization({ isLogin, onSubmit }) {
  const texts = isLogin ? LOGIN_TEXTS : REGISTRATION_TEXTS;
  const {
    register,
    watch,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });


  const name = watch('name')
  const email = watch('email')
  const password = watch('password')

  const handleOnSubmit = () => {
    onSubmit({ name, email, password })
  }

  return (
    <div className="wrapper authorization">
      <NavLink to="/">
        <img className="authorization__logo" src={logo} alt="логотип" />
      </NavLink>
      <h1 className="authorization__heading">{texts.heading}</h1>
      <form
        className="authorization__form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="authorization__box">
          {!isLogin && (
            <div className="authorization__field">
              <p className="authorization__placeholder">Имя</p>
              <input
                type="text"
                value={name}
                className="authorization__input"
                {...register('name', {
                  required: 'Обязательное поле',
                  minLength: {
                    value: 2,
                    message: 'вы должны заполнить минимум 2 символа'
                  },
                  maxLength: {
                    value: 20,
                    message: 'вы должны заполнить максимум 20 символов'
                  },
                  pattern: {
                    value: /^[A-Za-zА-Яа-яЁё /h -]+$/,
                    message: 'Имя не должно содержать цифры'
                  }
                })} />
            </div>
          )}
          <div className='authorization__input-error'>{
            errors?.name && <span className='authorization__input-error-text'>{errors?.name?.message || 'Что-то пошло не так...'}</span>
          }</div>
          <div className="authorization__field">
            <p className="authorization__placeholder">E-mail</p>
            <input
              required
              type="email"
              value={email}
              className="authorization__input"
              {...register('email', {
                required: 'Обязательное поле',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный емайл'
                }
              })}
            />
            <div className='authorization__input-error'>{errors?.email && <span className='authorization__input-error-text'>{errors?.email?.message || 'Что-то пошло не так...'}</span>}</div>
          </div>

          <div className="authorization__field">
            <p className="authorization__placeholder">Пароль</p>
            <input
              type="password"
              value={password}
              className="authorization__input"
              {...register('password', {
                required: 'Обязательное поле',
                minLength: {
                  value: 4,
                  message: 'вы должны заполнить минимум 4 символа'
                },
                maxLength: {
                  value: 30,
                  message: 'вы должны заполнить максимум 30 символов'
                },
              })}
            />
            <div className='authorization__input-error'>{errors?.password && <span className='authorization__input-error-text'>{errors?.password?.message || 'Что-то пошло не так...'}</span>}</div>
          </div>
        </div>
        <div
          className={`authorization__button-box ${isLogin ? "authorization__button_box_signin" : ""
            }`}
        >
          <button type="submit" className={
            isValid ? (
              'authorization__button authorization__button_active'
            ) : (
              'authorization__button authorization__button_unactive'
            )} disabled={!isValid}>
            {texts.button}
          </button>
          <span className="authorization__subline">
            {texts.linkText}
            <Link to={texts.route} className="authorization__link">
              {texts.link}
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
