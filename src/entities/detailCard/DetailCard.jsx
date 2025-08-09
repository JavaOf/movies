import { FaStar, FaLanguage } from "react-icons/fa";
import './detailCard.scss';
import { t } from "i18next";

export const DetailCard = ({
  item
}) => {

  const classVote = item?.vote_average >= 7 ? 'top' : 'low';
  const now = new Date();
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
            <span> ({item?.release_date && now?.getFullYear(item.release_date)})</span>
          </h2>
        </div>
        <div className="detail-card__row-wrapper row">
          <b className="detail-card__row-wrapper-tagline">{t('information')}</b>
          <span className="detail-card__row-wrapper-dots"></span>
          <b className="detail-card__row-wrapper-date">{item.release_date && (
            now.getFullYear(item?.release_date)
          )} / ({item?.origin_country}) / {hours} {t('hour')} {minutes} {t('min')}</b>
        </div>
        <div className="detail-card__row-wrapper row">
          <b className="detail-card__row-wrapper-tagline">{t('genres')}</b>
          <span className="detail-card__row-wrapper-dots"></span>
          <b className="detail-card__row-wrapper-date">{item?.genres?.map((item, i, arr) => {
            return <span key={item?.id}>
              {item.name}
              {i !== arr.length - 1 ? ', ' : ''}
            </span>
          })}</b>
        </div>
        <div className="detail-card__row-wrapper">
          <span className="detail-card__row-wrapper-label">{t('review')}</span>
          <p className="detail-card__row-wrapper-overview">
            {item?.overview?.length > 300 ? item?.overview?.slice(0, 300).trim() + '...' : item?.overview}
          </p>
        </div>

      </div>
    </section>
  )
}
