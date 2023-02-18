import { useEffect, useMemo } from "react";

import { useLocation } from "react-router-dom";

import Container from '../Container/Container';
import MoviesCard from '../MoviesCard/MoviesCard'

import "./MoviesCardList.css";


export default function MoviesCardList(
    {
        onMovieLike,
        onMovieDelete,
        handleMovies,
        handleSavedMovies,
        savedMovies,
        movies
    }
) {
    const location = useLocation();
    const isMoviesRoute = location.pathname === "/movies"
    const isSavedMovies = useMemo(() =>
        location.pathname === "/saved-movies",
        [location.pathname]);

    useEffect(() => {
        if (!localStorage.getItem("movies") || isMoviesRoute) {
            handleMovies();
        }

        handleSavedMovies();
    }, [location.pathname]);

    const moviesForMapping = useMemo(() =>
        isSavedMovies ?
            savedMovies
            : movies,
        [isSavedMovies, savedMovies, movies]);

    return (
        <Container>
            <ul className='cards'>
                {moviesForMapping?.length ? moviesForMapping?.map((movie) => {
                    const savedMovieData = savedMovies.find((m) => m.movieId === movie.id);
                    return (
                        <MoviesCard
                            key={isSavedMovies ? movie.movieId : movie.id}
                            movie={movie}
                            onMovieLike={onMovieLike}
                            isSavedMovies={isSavedMovies}
                            onMovieDelete={onMovieDelete}
                            savedMovieData={savedMovieData}
                        />
                    )
                }) : <li className=''>Фильмов нет</li>}
            </ul>

            {location.pathname === "/movies" ? <button
                type="button"
                className='cards__button'
                onClick={() => null}
            >
                Еще
            </button> : ""}
        </Container>
    )
}



