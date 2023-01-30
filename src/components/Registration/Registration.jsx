import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/headerLogo.svg'

import "./Registration.css";

const initialValues = {
    email: "",
    password: ""
}

const REGISTRATION_TEXTS = {
    heading: "Добро пожаловать!",
    button: "Зарегистрироваться",
    linkText: "Уже зарегистрированы? ",
    link: "Войти",
    route: "/signin"
}

const LOGIN_TEXTS = {
    heading: "Рады видеть!",
    button: "Войти",
    linkText: "Ещё не зарегистрированы? ",
    link: "Регистрация",
    route: "/signup"
}


export default function Registration({ isLogin, onSubmit }) {
    const texts = isLogin ? LOGIN_TEXTS : REGISTRATION_TEXTS;
    const values = isLogin ? initialValues : { ...initialValues, name: "" }

    const [inputValues, setInputValues] = useState(values);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        setInputValues(values)
    }, [isLogin]);

    return (<div className='wrapper registration'>
        <img src={logo} alt="logo" className='registration__logo' />
        <h1 className='registration__heading'>{texts.heading}</h1>
        <form className='registraion__form' onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}>
            <div className='registration__box'>
                {!isLogin && <div className='registration__field'>
                    <p className='registration__placeholder'>Имя</p>
                    <input type="text" name="name" value={inputValues.name} onChange={handleChange
                    } className='registration__input' />
                </div>}


                <div className='registration__field'>
                    <p className='registration__placeholder'>E-mail</p>
                    <input type="email" name="email" value={inputValues.email} onChange={handleChange
                    } className='registration__input' />
                </div>

                <div className='registration__field'>
                    <p className='registration__placeholder'>Пароль</p>
                    <input type="password" name="password" value={inputValues.password} onChange={handleChange
                    } className='registration__input' />
                </div>
            </div>

            <div className={`registration__button-box ${isLogin ? "registration__button_box_signin" : ""}`}>
                <button type="submit" className='registration__button'>{texts.button}</button>
                <span className='registration__subline'>{texts.linkText}<Link to={texts.route} className='registration__link'>{texts.link}</Link></span>
            </div>
        </form>
    </div>)
}