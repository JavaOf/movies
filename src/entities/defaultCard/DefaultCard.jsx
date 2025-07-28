import './defaultCard.scss';
import { Link } from 'react-router-dom';

export const DefaultCard = ({
    title,
    id,
    overview,
    poster_path,
    vote_average,
    release_date,
    original_language,
    original_title,
    original_name,
    setActiveHover,
    profile_path
}) => {

    const classRating = vote_average >= 7 ? 'top' : 'low';
    return (
        <Link to={`/card/${id}`} className='default-card'>
            <div className='default-card__top'>
                <img
                    className='default-card__top-poster'
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                />
                {profile_path && (
                    <img
                        className='default-card__top-poster'
                        src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                        alt={title}
                    />
                )}
                {poster_path && (
                    <div className="default-card__top__statics">
                        <span className={`default-card__top__statics-vote ${classRating}`}>
                            {vote_average && vote_average?.toFixed(1)}
                        </span>
                        <span className='default-card__top__statics-language'>
                            {vote_average && original_language?.toUpperCase()}
                        </span>
                    </div>
                )}

            </div>
            <span className='default-card-title'>
                {title?.length > 15 ? title?.substr(0, 17)?.trim() + '...' : title}
            </span>
            {original_name && (
                <span className='default-card-title'>
                    {original_name?.length > 15 ? original_name?.substr(0, 17)?.trim() + '...' : original_name}
                </span>
            )}
        </Link>
    )
}
