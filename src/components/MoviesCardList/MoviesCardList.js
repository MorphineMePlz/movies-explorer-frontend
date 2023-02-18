import { useEffect, useMemo, useState } from "react";

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

    const windowWidth = useMemo(() => window.innerWidth, [window.innerWidth]);

    useEffect(() => {
        if (!localStorage.getItem("movies") || isMoviesRoute) {
            handleMovies();
        }

        handleSavedMovies();
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
            console.log(prevState + amountOfCards.additional)
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
    }, [amountOfCards.initial])

    return (
        <Container>
            <ul className='cards'>
                {moviesForMapping?.length ? moviesForMapping
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
                    }) : <li className=''>Фильмов нет</li>}
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



