import { useState } from "react";
import { useForm } from 'react-hook-form'


import Container from "../Container/Container";

import "./SearchForm.css";
import "./SearchCheckbox.css";

export default function SearchForm() {
  // const [searchValue, setSearchValue] = useState("");
  const [isShort, setShort] = useState(false);

  // const handleChange = (e) => {
  //   setSearchValue(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const obj = {
  //     movie: searchValue,
  //     isShort
  //   };

  //   console.log(obj);
  // };

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

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // searchMovies(search)
    const obj = {
      movie: search,
      isShort
    };

    console.log(obj);
  }


  return (
    <Container>
      <form className="search" onSubmit={handleSubmit(handleSubmitSearch)}>
        <div className="search__box">
          <input
            type="text"
            // value={searchValue}
            // onChange={handleChange}
            className="search__input"
            placeholder='Фильмы'
            {...register('search', {
              required: 'Нужно ввести ключевое слово',
              maxLength: {
                value: 40,
                message: 'максимум 40 символов'
              },
            })}
            value={search}
          />
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
