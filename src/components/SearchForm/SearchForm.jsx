import { useState } from "react";
import { useForm } from 'react-hook-form'

import Container from "../Container/Container";

import "./SearchForm.css";
import "./SearchCheckbox.css";

export default function SearchForm() {
  const [isShort, setShort] = useState(false);


  const {
    register,
    watch,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const search = watch('search', '')

  const handleSubmitSearch = () => {
    const obj = {
      search,
      isShort
    };
    localStorage.setItem("settings", JSON.stringify(obj))
    console.log(search)
  }

  return (
    <Container>
      <form className="search" onSubmit={handleSubmit(handleSubmitSearch)}>
        <div className="search__box">
          <input
            type="text"
            className="search__input"
            placeholder='Фильмы'
            {...register('search', {
              required: 'Нужно ввести ключевое слово',
              maxLength: {
                value: 40,
                message: 'максимум 40 символов'
              },
            })}
            value={search == null ? '' : search}
          />
          <div className='search-form__input-error'>{
            errors?.search && <span className='search-form__input-error-text'>{errors?.search?.message || 'Что-то пошло не так...'}</span>
          }</div>
          <button type="submit" className="search__submit" />
        </div>
        <div className="search__checkbox">
          <label htmlFor="checkbox" className="search-bar__switch">
            <input
              type="checkbox"
              className="search-bar__checkbox"
              onChange={() => setShort(!isShort)}
              id="checkbox"
              checked={isShort}
            />
            <span className="search-bar__slider"></span>
          </label>
          <p className="search-bar__placeholder">Короткометражки</p>
        </div>
      </form>
    </Container>
  );
}
