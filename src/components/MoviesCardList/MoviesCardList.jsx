import { useState } from "react";

import Container from '../Container/Container';
import MoviesCard from '../MoviesCard/MoviesCard'
import { MOCK_DATA } from "../../utils/utils";


import "./MoviesCardList.css";



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



