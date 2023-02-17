import { useState } from "react";
import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import Container from '../Container/Container';
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from "../Preloader/Preloader";

import { api } from "../../utils/MoviesApi";

import "./MoviesCardList.css";

import { mainApi } from "../../utils/MainApi";


export default function MoviesCardList({ isSavedMovies, onMovieLike }) {
    const location = useLocation();

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleDeleteMovie = (movieId) => {
        mainApi
            .deleteMovie(movieId)
            .then(() => {
                const filteredMovies = savedMovies.filter((movie) => movie._id !== movieId)
                setSavedMovies(filteredMovies)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleSavedMovies = () => {
        setLoading(true)
        mainApi
            .getSavedMovies()
            .then((data) => {
                setSavedMovies(data);
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
    }

    const handleMovies = () => {
        setLoading(true);
        api.getMovies().then((initialMovies) => {
            setMovies(initialMovies)
            localStorage.setItem('movies', JSON.stringify(initialMovies))
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (!localStorage.getItem("movies") || location.pathname === "/movies") {
            handleMovies();
        }

        handleSavedMovies();
    }, [isSavedMovies, location.pathname]);

    const moviesForMapping = isSavedMovies ? savedMovies : movies;

    return (
        <Container>
            {isLoading ?
                <Preloader style={{ margin: "0 auto" }} />
                :
                <ul className='cards'>
                    {moviesForMapping?.map((movie, i) => {
                        const savedMovieData = savedMovies.find((m) => m.movieId === movie.id);

                        return (
                            <MoviesCard
                                key={i}
                                movie={movie}
                                onMovieLike={onMovieLike}
                                isSavedMovies={isSavedMovies}
                                onMovieDelete={handleDeleteMovie}
                                savedMovieData={savedMovieData}
                            />
                        )
                    })}
                </ul>
            }

            <button
                type="button"
                className='cards__button'
                onClick={() => null}
            >
                Еще
            </button>
        </Container>
    )
}



