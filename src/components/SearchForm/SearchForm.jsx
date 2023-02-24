import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom';

import Container from "../Container/Container";

import "./SearchForm.css";
import "./SearchCheckbox.css";

const SHORT_MOVIE_LENGTH = 40;

export default function SearchForm({ 
  setMovies, 
  initialMovies, 
  isLoading, 
  getSearchValue, 
  cancelInitialRendeState 
}) {
  const location = useLocation();

  const initialSettings =
    localStorage.getItem("settings") ?
      JSON.parse(localStorage.getItem("settings")) :
      {
        isShort: false,
        searchValue: ""
      }

  const [isShort, setShort] = useState(initialSettings?.isShort);

  const {
    register,
    watch,
    reset,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const searchValue = watch('search', initialSettings?.searchValue);

  const filterMovies = () => {
    let filteredMovies = initialMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValue.toLowerCase() || ""));

    if (isShort) {
      filteredMovies = filterMoviesByLength(filteredMovies);
    }

    setMovies(filteredMovies);
  }

  const filterMoviesByLength = (moviesArr = []) => {
    return moviesArr.filter((movie) => movie.duration <= SHORT_MOVIE_LENGTH);
  };

  const handleSubmitSearch = () => {
    cancelInitialRendeState();
    const newSettings = {
      searchValue,
      isShort
    };

    filterMovies();

    if (location.pathname !== "/saved-movies") {
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  }

  useEffect(() => {
    if (!isLoading && searchValue !== "") {
      filterMovies();
    }
  }, [isLoading]);

  useEffect(() => {
    getSearchValue(searchValue)
  }, [searchValue]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      reset({ 
        search: ""
      });
      setShort(false);
    }

    if (location.pathname === "/movies") {
      reset({
        search: initialSettings?.searchValue
      })
      setShort(initialSettings?.isShort || false)
      filterMovies();
    }
  }, [location.pathname]);

  return (
    <Container>
      <form className="search" onSubmit={handleSubmit(handleSubmitSearch)}>
        <div className="search__box">
          <input
            type="text"
            className="search__input"
            placeholder='Фильмы'
            {...register('search', {
              required: "Поле не должно быть пустым",
              maxLength: {
                value: 40,
                message: 'вы должны заполнить максимум 40 символов'
              },
            })}
            value={searchValue}
          />
          <div className='search-form__input-error'>
            {
            errors?.search && 
              <span className='search-form__input-error-text'>
                {errors?.search?.message || 'Что-то пошло не так...'}
              </span>
            }
          </div>
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
