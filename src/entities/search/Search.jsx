import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../../app/store/slices/searchSlice/searchThunk';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import './search.scss';

export const Search = ({ onClick }) => {
    const dispatch = useDispatch();
    const { searchResults } = useSelector((state) => state.searchSlice);
    const [searchValue, setSearchValue] = useState('');
    const { t } = useTranslation();
    const [selectionSearch, setSelectionSearch] = useState('all');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const changeSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const clearSearch = () => {
        setSearchValue('');
        dispatch(searchMovies({ type: selectionSearch, query: '' }));
    };

    useEffect(() => {
        const trimmed = searchValue.trim();
        const timeout = setTimeout(() => {
            if (trimmed.length > 2) {
                if (selectionSearch === 'all') {
                    dispatch(searchMovies({ type: 'movie', query: trimmed }));
                    dispatch(searchMovies({ type: 'tv', query: trimmed }));
                    dispatch(searchMovies({ type: 'person', query: trimmed }));
                } else {
                    dispatch(searchMovies({ type: selectionSearch, query: trimmed }));
                }
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchValue, selectionSearch, dispatch]);

    const movies = searchResults?.movie || [];
    const visibleMovies = movies.slice(0, 3);

    const filterButtons = [
        { key: 'all', label: t('all') },
        { key: 'movie', label: t('movie') },
        { key: 'tv', label: t('tv') },
        { key: 'person', label: t('actors') }
    ];

    return (
        <div className='search'>
            <button className='search-btn' onClick={onClick}>
                {t('close')}
            </button>
            <div className="search__content">
                <h2 className='search__content-title'>{t('search')}</h2>

                <div className="search__content__wrapper">
                    <input
                        type="search"
                        placeholder={t('search_by_movies_TV_series_actors')}
                        value={searchValue}
                        onChange={changeSearch}
                    />
                    <button onClick={clearSearch}>{t('clear')}</button>
                </div>

                {/* Бургер / Категории */}
                <div className="search__filter">
                    <div className="search__filter-burger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                        <span>{t('categories')}</span>
                    </div>

                    <div className={`search__filter-buttons ${menuOpen ? 'open' : ''}`}>
                        {filterButtons.map(({ key, label }) => (
                            <button
                                key={key}
                                className={selectionSearch === key ? 'active' : ''}
                                onClick={() => {
                                    setSelectionSearch(key);
                                    setMenuOpen(false);
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="search__results">
                    {visibleMovies.length > 0 ? (
                        visibleMovies.map((item) => (
                            <Link
                                onClick={onClick}
                                to={`/card/${item?.id}`}
                                key={item.id}
                                className="search__item"
                            >
                                <img
                                    className='search__item-poster'
                                    src={
                                        item.poster_path
                                            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                                            : '/no-image.jpg'
                                    }
                                    alt={item.title}
                                />
                                <div className="search__item__texts">
                                    <h3 className='search__item__texts-title'>{item.title}</h3>
                                    <div>
                                        <span className='search__item__texts-vote'>
                                            {t('vote')}: {item.vote_average}
                                        </span>
                                        <span className='search__item__texts-release'>
                                            {t('date')}: {item.release_date}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        searchValue.trim().length > 2 && (
                            <span className='search__no-results'>{t('nothing_found')}</span>
                        )
                    )}

                    {movies.length > 3 && searchValue.trim().length > 2 && (
                        <button
                            className='search__see-more-btn'
                            onClick={() => {
                                onClick();
                                navigate(`/search?query=${searchValue}&type=${selectionSearch}`);
                            }}
                        >
                            {t('see_more')} ({movies.length})
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
