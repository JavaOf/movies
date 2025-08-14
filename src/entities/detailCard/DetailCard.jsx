import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrailer } from '../../app/store/slices/detailSlice/detailThunk';
import Modal from 'react-modal';
import { FaStar } from "react-icons/fa";
import { t } from "i18next";
import './detailCard.scss';
import { Link, useNavigate } from 'react-router-dom';

export const DetailCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trailers = useSelector(state => state.detailSlice.trailers);
  const isRegistered = useSelector(state => state.authSlice?.user); // проверка регистрации
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState('');

  const handleTrailerClick = async () => {
    if (!isRegistered) return; // блокировка для незарегистрированных
    if (trailers[item.id]) {
      setCurrentTrailerUrl(`https://www.youtube.com/embed/${trailers[item.id].key}`);
      setIsModalOpen(true);
    } else {
      const action = await dispatch(getTrailer(item.id));
      if (action.payload?.trailer) {
        setCurrentTrailerUrl(`https://www.youtube.com/embed/${action.payload.trailer.key}`);
        setIsModalOpen(true);
      } else {
        console.log('Трейлер не найден');
      }
    }
  };

  const classVote = item?.vote_average >= 7 ? 'top' : 'low';
  const hours = Math.floor(item?.runtime / 60) || 0;
  const minutes = item?.runtime % 60 || 0;

  return (
    <section className='detail-card'>
      <div className="detail-card__row">
        <img
          className="detail-card__row-poster"
          src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
          alt={item?.title}
        />
      </div>

      <div className="detail-card__row">
        <div className="detail-card__row-wrapper row">
          <span className="detail-card__row-wrapper-language">
            {item?.original_language?.toUpperCase()}
          </span>
          <div className="row">
            <span className={`detail-card__row-wrapper-vote ${classVote}`}>
              {item?.vote_average?.toFixed(2)} <FaStar />
            </span>
            <span className={`detail-card__row-wrapper-vote ${classVote}`}>
              {t('vote')} - {item?.vote_count}
            </span>
          </div>
        </div>

        <div className="detail-card__row-wrapper">
          <h2 className="detail-card__row-wrapper-title">
            {item?.title}
            <span> ({item?.release_date?.slice(0, 4)})</span>
          </h2>
        </div>

        <div className="detail-card__row-wrapper row">
          <b className="detail-card__row-wrapper-tagline">{t('information')}</b>
          <span className="detail-card__row-wrapper-dots"></span>
          <b className="detail-card__row-wrapper-date">
            {hours} {t('hour')} {minutes} {t('min')} / {item?.origin_country?.join(', ')}
          </b>
        </div>

        <div className="detail-card__row-wrapper row">
          <b className="detail-card__row-wrapper-tagline">{t('genres')}</b>
          <span className="detail-card__row-wrapper-dots"></span>
          <b className="detail-card__row-wrapper-date">
            {item?.genres?.map((g, i, arr) => (
              <span key={g.id}>
                {g.name}{i !== arr.length - 1 ? ', ' : ''}
              </span>
            ))}
          </b>
        </div>

        <div className="detail-card__row-wrapper">
          <span className="detail-card__row-wrapper-label">{t('review')}</span>
          <p className="detail-card__row-wrapper-overview">
            {item?.overview?.length > 300
              ? item?.overview.slice(0, 300).trim() + '...'
              : item?.overview
            }
          </p>
        </div>
      </div>

      <div className="detail-card__row last">
        {item?.belongs_to_collection && (
          <div className="detail-card__row-wrapper-new">
            <span className="detail-card__row-wrapper-new-label">{t('collection')}:</span>
            <span className="detail-card__row-wrapper-new-value">{item.belongs_to_collection.name}</span>
          </div>
        )}

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">{t('production')}:</span>
          <span className="detail-card__row-wrapper-new-value">
            {item.production_companies?.map(c => c.name).join(', ')}
          </span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">{t('countries')}:</span>
          <span className="detail-card__row-wrapper-new-value">
            {item.production_countries?.map(c => c.name).join(', ')}
          </span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">{t('languages')}:</span>
          <span className="detail-card__row-wrapper-new-value">
            {item.spoken_languages?.map(l => l.name).join(', ')}
          </span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">{t('budget')}:</span>
          <span className="detail-card__row-wrapper-new-value">${item?.budget?.toLocaleString()}</span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">{t('revenue')}:</span>
          <span className="detail-card__row-wrapper-new-value">${item?.revenue?.toLocaleString()}</span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">{t('status')}:</span>
          <span className="detail-card__row-wrapper-new-value">{item?.status}</span>
        </div>

        {item.tagline && (
          <div className="detail-card__row-wrapper-new">
            <span className="detail-card__row-wrapper-new-label">{t('tagline')}:</span>
            <span className="detail-card__row-wrapper-new-value">{item?.tagline}</span>
          </div>
        )}

        {item.homepage && (
          <div className="detail-card__row-wrapper-new btns">
            <button
              className={`detail-card__row-wrapper-new-button ${!isRegistered ? 'disabled' : ''}`}
              onClick={() => isRegistered && window.open(item.homepage, "_blank")}
              title={!isRegistered ? 'Register to use this action' : ''}
            >
              {t('go_to_site')}
            </button>

            <Link
              className={`detail-card__row-wrapper-new-button ${!isRegistered ? 'disabled' : ''}`}
              onClick={(e) => {
                if (!isRegistered) e.preventDefault();
                else handleTrailerClick();
              }}
              to={isRegistered ? `/trailer/${item.id}` : '#'}
              title={!isRegistered ? 'Register to use this action' : ''}
              style={{ textDecoration: 'none' }}
            >
              {t('watch')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
