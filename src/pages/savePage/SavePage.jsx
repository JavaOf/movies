// SavePage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './savePage.scss';

export const SavePage = () => {
  const dispatch = useDispatch();
  const { saveList, removeToSave } = useSelector(state => state.saveSlice);

  const handleRemove = (movie) => {
    dispatch(removeToSave(movie));
  };

  if (saveList.length === 0) {
    return <div className="save-page__null container">Нет сохранённых фильмов</div>;
  }

  return (
    <div className="save-page container">
      <h2 className="save-page__title">Избранное</h2>
      <div className="save-page__list">
        {saveList.map(movie => (
          <div key={movie.id} className="save-page__card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="save-page__poster"
            />
            <div className="save-page__info">
              <h3 className="save-page__name">{movie.title}</h3>
              <div className="save-page__row-wrapper">
                <span className="save-page__label">Рейтинг:</span>
                <span className={`save-page__vote ${movie.vote_average >= 7 ? 'top' : 'low'}`}>
                  {movie.vote_average}
                </span>
              </div>
              <div className="save-page__row-wrapper">
                <span className="save-page__label">Язык:</span>
                <span className="save-page__language">{movie.original_language.toUpperCase()}</span>
              </div>
              <div className="save-page__row-wrapper">
                <span className="save-page__label">Дата выхода:</span>
                <span className="save-page__date">{movie.release_date}</span>
              </div>
              <div className="save-page__buttons">
                <button 
                  onClick={() => handleRemove(movie)}
                  className="save-page__btn save-page__btn--remove"
                >
                  <FiTrash2 /> Удалить
                </button>
                <Link
                  to={`/card/${movie.id}`}
                  className="save-page__btn save-page__btn--goto"
                >
                  Перейти
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
