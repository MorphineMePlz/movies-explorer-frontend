import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/headerLogo.svg";
import { INITIAL_VALUES, REGISTRATION_TEXTS, LOGIN_TEXTS } from "../../utils/utils";

import "./Authorization.css";



export default function Authorization({ isLogin, onSubmit }) {
  const texts = isLogin ? LOGIN_TEXTS : REGISTRATION_TEXTS;
  const values = isLogin ? INITIAL_VALUES : { ...INITIAL_VALUES, name: "" };

  const [inputValues, setInputValues] = useState(values);

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setInputValues(values);
  }, [isLogin]);

  return (
    <div className="wrapper authorization">
      <img src={logo} alt="logo" className="authorization__logo" />
      <h1 className="authorization__heading">{texts.heading}</h1>
      <form
        className="authorization__form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(inputValues);
        }}
      >
        <div className="authorization__box">
          {!isLogin && (
            <div className="authorization__field">
              <p className="authorization__placeholder">Имя</p>
              <input
                required
                type="text"
                name="name"
                value={inputValues.name}
                onChange={handleChange}
                className="authorization__input"
              />
            </div>
          )}

          <div className="authorization__field">
            <p className="authorization__placeholder">E-mail</p>
            <input
              required
              type="email"
              name="email"
              value={inputValues.email}
              onChange={handleChange}
              className="authorization__input"
            />
          </div>

          <div className="authorization__field">
            <p className="authorization__placeholder">Пароль</p>
            <input
              required
              type="password"
              name="password"
              value={inputValues.password}
              onChange={handleChange}
              className="authorization__input"
            />
          </div>
        </div>

        <div
          className={`authorization__button-box ${isLogin ? "authorization__button_box_signin" : ""
            }`}
        >
          <button type="submit" className="authorization__button">
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
