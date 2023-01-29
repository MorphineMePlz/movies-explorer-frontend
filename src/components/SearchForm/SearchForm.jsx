
import { useState } from "react";

import Container from '../Container/Container';

import "./SearchForm.css";
import "./SearchCheckbox.css"

export default function SearchForm() {
    const [searchValue, setSearchValue] = useState("");
    const [isShort, setShort] = useState(false);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
            movie: searchValue,
            isShort
        }

        console.log(obj);
    }

    return (
        <Container>
            <form className='search' onSubmit={handleSubmit}>
                <input type="text" value={searchValue} onChange={handleChange} className="search__input" />
                <button type="submit" className='search__submit' />
                <div className='search__checkbox'>
                    <label htmlFor="checkbox" className="search-bar__switch">
                        <input type="checkbox"
                            className="search-bar__checkbox"
                            onChange={() => setShort(!isShort)} id="checkbox"
                            checked={isShort}
                        />
                        <span className="search-bar__slider"></span>
                    </label>
                    <p className="search-bar__placeholder">Короткометражки</p>
                </div>
            </form>
        </Container>
    )
}
