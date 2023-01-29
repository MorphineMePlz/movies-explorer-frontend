import { useState } from "react";

import Container from '../Container/Container';
import MoviesCard from '../MoviesCard/MoviesCard'
import image from "../../assets/images/movie_pic.jpg";

import "./MoviesCardList.css";

const MOCK_DATA = {
    title: "33 слова о дизайне",
    length: "1 ч 47 м",
    image,
    isSaved: false
}

export default function MoviesCardList({ isSavedMovies }) {
    const [currentCards, setCurrentCards] = useState(12);

    return (
        <Container>
            <ul className='cards'>
                {Array.from({ length: currentCards }, (_, i) => <MoviesCard data={MOCK_DATA} isSavedMovies={isSavedMovies} key={i} />)}
            </ul>
            <button type="button" className='cards__button' onClick={() => setCurrentCards(currentCards + 6)}>Еще</button>
        </Container>
    )
}



