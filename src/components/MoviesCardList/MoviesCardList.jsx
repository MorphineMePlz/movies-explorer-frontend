import { useState } from "react";
import { useContext } from "react";
import Container from '../Container/Container';
import MoviesCard from '../MoviesCard/MoviesCard'
import { CurrentUserContext } from "../../context/CurrentUserContext";



import "./MoviesCardList.css";



export default function MoviesCardList({ isSavedMovies, movies, onMovieLike }) {
    const [currentCards, setCurrentCards] = useState(12);
    const currentUser = useContext(CurrentUserContext);
    return (
        currentUser && (<Container>
            <ul className='cards'>
                {movies.map((movie, i) => (
                    <MoviesCard data={movie} isSavedMovies={isSavedMovies} key={i} onMovieLike={onMovieLike} />
                ))}
            </ul>
            <button type="button" className='cards__button' onClick={() => setCurrentCards(currentCards + 6)}>Еще</button>
        </Container>)
    )
}



