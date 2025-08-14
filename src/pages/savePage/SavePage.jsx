import React from 'react';
import { removeToSave } from '../../app/store/slices/saveSlices/saveSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './savePage.scss';

export const SavePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { saveList } = useSelector((state) => state.saveSlice);

  const handleRemove = (movie) => {
    dispatch(removeToSave(movie));
  };

  if (saveList.length === 0) {
    return (
      <div className="save-page__null container">
        {t('no_saved_movies')}
      </div>
    );
  }

  return (
    <div className="save-page container">
      <h2 className="save-page__title">{t('favorites')}</h2>
      <div className="save-page__list">
        {saveList.map((movie) => (
          <div key={movie.id} className="save-page__card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="save-page__poster"
            />
            <div className="save-page__info">
              <h3 className="save-page__name">{movie.title}</h3>
              <div className="save-page__row-wrapper">
                <span className="save-page__label">{t('vote')}:</span>
                <span
                  className={`save-page__vote ${
                    movie.vote_average >= 7 ? 'top' : 'low'
                  }`}
                >
                  {movie.vote_average}
                </span>
              </div>
              <div className="save-page__row-wrapper">
                <span className="save-page__label">{t('languages')}:</span>
                <span className="save-page__language">
                  {movie.original_language.toUpperCase()}
                </span>
              </div>
              <div className="save-page__row-wrapper">
                <span className="save-page__label">{t('date')}:</span>
                <span className="save-page__date">{movie.release_date}</span>
              </div>
              <div className="save-page__buttons">
                <button
                  onClick={() => handleRemove(movie)}
                  className="save-page__btn save-page__btn--remove"
                >
                  <FiTrash2 /> {t('delete')}
                </button>
                <Link
                  to={`/card/${movie.id}`}
                  className="save-page__btn save-page__btn--goto"
                >
                  {t('go_to')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
