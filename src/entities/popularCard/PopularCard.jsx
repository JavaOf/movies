import { MdContentCopy, MdNotificationsActive } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import './popularCard.scss';

export const PopularCard = ({
    id, title, overview,
    adult,
    original_language, poster_path,
    vote_count, release_date, popularity,
    vote_average,
    activeCard,
    setActiveCard,
    handleAddToSave
}) => {

    const voteClass = vote_average >= 7 ? 'top' : 'low';


    return (
        <div className={`popular-card ${activeCard === id ? 'show' : ''}`}>
            <div className="popular-card-poster">
                {!adult && <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                />}
            </div>
            <div className="popular-card-statics">
                <span className={`popular-card-statics-vote ${voteClass}`}>{vote_average.toFixed(1)}</span>
                <span className={`popular-card-statics-language`}>{original_language.toUpperCase()}</span>
            </div>
            <div
                onMouseEnter={() => setActiveCard(id)}
                onMouseLeave={() => setActiveCard(null)}
                className="popular-card__texts"
            >
                <h2 className="popular-card__texts-title">{title}</h2>
                <div className={`popular-card__hover ${activeCard === id ? 'show' : ''}`}>
                    <p className="popular-card__hover-overview">{
                        overview.length > 50 ? overview.slice(0, 170).trim() + '...' : overview
                    }</p>
                    <div className="popular-card__hover-options">
                        <span className="popular-card__hover-options-copy"><MdContentCopy /></span>
                        <span className="popular-card__hover-options-notification"><MdNotificationsActive /></span>
                        <span 
                        onClick={handleAddToSave}
                        className="popular-card__hover-options-save"
                        ><FiSave /></span>
                        <button className="popular-card__hover-options-look">Смотреть</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
