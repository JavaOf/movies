import { useState } from 'react';
import './search.scss';


export const Search = ({ onClick }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className='search'>
            <button
                className='search-btn'
                onClick={onClick}
            >close</button>
            <div className="search__content">
                <h2 className='search__content-title'>Поиск</h2>
                <div className="search__content__wrapper">
                    <input
                        type="search"
                        placeholder='Поиск по фильмам, сериалам, актерам'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className="search__content__wrapper">
                    <img src="" alt="" />
                    <div className="search__content__wrapper-texts">
                        <h2></h2>
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
