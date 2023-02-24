import { useEffect, useMemo, useState } from "react";

import { useLocation } from "react-router-dom";

import Container from '../Container/Container';
import MoviesCard from '../MoviesCard/MoviesCard'

import "./MoviesCardList.css";


export default function MoviesCardList(
    {
        movies,
        savedMovies,
        onMovieLike,
        getBeatMovies,
        onMovieDelete,
        isInitialRender,
        handleSavedMovies,
    }
) {
    const location = useLocation();
    const isMoviesPath = useMemo(() =>
        location.pathname === "/movies",
        [location.pathname]);
    const isSavedMovies = useMemo(() =>
        location.pathname === "/saved-movies",
        [location.pathname]);

    const windowWidth = useMemo(() => window.innerWidth, [window.innerWidth]);

    useEffect(() => {
        handleSavedMovies();

        if (!localStorage.getItem("movies") || isMoviesPath) {
            getBeatMovies();
        }
    }, [location.pathname]);

    const amountOfCards = useMemo(() => {
        if (windowWidth > 769) {
            return {
                initial: 12,
                additional: 3
            }
        }

        if (windowWidth > 550 && windowWidth <= 768) {
            return {
                initial: 8,
                additional: 2
            }
        }

        if (windowWidth <= 550) {
            return {
                initial: 5,
                additional: 1
            }
        }
    }, [windowWidth]);

    const [sliceAmount, setSliceAmount] = useState(amountOfCards.initial);

    const handleSliceMovies = () => {
        setSliceAmount((prevState) => {
            return prevState + amountOfCards.additional
        });
    }

    const moviesForMapping = useMemo(() =>
        isSavedMovies ?
            savedMovies
            : movies,
        [isSavedMovies, savedMovies, movies, amountOfCards]);

    useEffect(() => {
        setSliceAmount(amountOfCards.initial)
    }, [amountOfCards.initial]);

    return (
        <Container>
            <ul className={`cards ${!isInitialRender && moviesForMapping?.length ? "cards_grid" : "cards_flex"}`}>
                {!isInitialRender && moviesForMapping?.length ? moviesForMapping
                    .slice(0, sliceAmount)
                    .map((movie) => {
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
                    }) : <li className='cards__text'>Вы еще не добавили фильмы</li>}
            </ul>
            {!(moviesForMapping.length <= 12 || sliceAmount >= moviesForMapping.length) && <button
                type="button"
                className='cards__button'
                onClick={() => handleSliceMovies()}
            >
                Еще
            </button>}
        </Container>
    )
}



