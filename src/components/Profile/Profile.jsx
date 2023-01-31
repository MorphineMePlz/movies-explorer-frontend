import { useState } from 'react';

import "./Profile.css";


export default function Profile({ data }) {
    const [inputValues, setInputValues] = useState(data);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    };

    return (<div className='wrapper profile'>
        <h1 className='profile__heading'>Привет, {inputValues.name}</h1>
        <div className='profile__box'>
            <div className='profile__table-line'>
                <p className='profile__placeholder'>Имя</p>
                <input required type="text" name="name" value={inputValues.name} onChange={handleChange
                } className='profile__input' />
            </div>

            <div className='profile__table-line'>
                <p className='profile__placeholder'>E-mail</p>
                <input required type="email" name="email" value={inputValues.email} onChange={handleChange
                } className='profile__input' />
            </div>
        </div>
        <div className='profile__button-box'>
            <button type="button" className='profile__button'>Редактировать</button>
            <button type="button" className='profile__button profile__button_logout'>Выйти из аккаунта</button>
        </div>
    </div>)
}