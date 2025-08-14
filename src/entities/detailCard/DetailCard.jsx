import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrailer } from '../../app/store/slices/detailSlice/detailThunk';;
import Modal from 'react-modal';
import { FaStar } from "react-icons/fa";
import { t } from "i18next";
import './detailCard.scss';
import { Link, useNavigate } from 'react-router-dom';

export const DetailCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trailers = useSelector(state => state.detailSlice.trailers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState('');

  const handleTrailerClick = async () => {
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
            <span className="detail-card__row-wrapper-new-label">Collection:</span>
            <span className="detail-card__row-wrapper-new-value">{item.belongs_to_collection.name}</span>
          </div>
        )}

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">Production:</span>
          <span className="detail-card__row-wrapper-new-value">
            {item.production_companies?.map(c => c.name).join(', ')}
          </span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">Countries:</span>
          <span className="detail-card__row-wrapper-new-value">
            {item.production_countries?.map(c => c.name).join(', ')}
          </span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">Languages:</span>
          <span className="detail-card__row-wrapper-new-value">
            {item.spoken_languages?.map(l => l.name).join(', ')}
          </span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">Budget:</span>
          <span className="detail-card__row-wrapper-new-value">${item?.budget?.toLocaleString()}</span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">Revenue:</span>
          <span className="detail-card__row-wrapper-new-value">${item?.revenue?.toLocaleString()}</span>
        </div>

        <div className="detail-card__row-wrapper-new">
          <span className="detail-card__row-wrapper-new-label">Status:</span>
          <span className="detail-card__row-wrapper-new-value">{item?.status}</span>
        </div>

        {item.tagline && (
          <div className="detail-card__row-wrapper-new">
            <span className="detail-card__row-wrapper-new-label">Tagline:</span>
            <span className="detail-card__row-wrapper-new-value">{item?.tagline}</span>
          </div>
        )}

        {item.homepage && (
          <div className="detail-card__row-wrapper-new row">
            <button
              className="detail-card__row-wrapper-new-button"
              onClick={() => window.open(item.homepage, "_blank")}
            >
              Перейти на сайт
            </button>
            <Link
              className="detail-card__row-wrapper-new-button"
              onClick={handleTrailerClick}
              to={`/trailer/${item.id}`}
              style={{ textDecoration: 'none' }}
            >
              Просмотр
            </Link>
             <Link
              className="detail-card__row-wrapper-new-button"
              onClick={handleTrailerClick}
              to={`/trailer/${item.id}`}
              style={{ textDecoration: 'none' }}
            >
              Просмотр
            </Link>
          </div>
        )}
      </div>

    </section>
  );
};
