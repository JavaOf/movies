import './hoverDefaultCard.scss';

export const HoverDefaultCard = ({
    poster_path,
    id,
    title,
    release_date,
    popularity,
    vote_average,
    overview,

}) => {
    return (
        <div className='hover-default-card'>
            <img
                className='hover-default-card__poster'
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
            />
            <div className="hover-default-card__content">
                <div className="hover-default-card__content-row">
                
                </div>
                <div className="hover-default-card__content-column">

                </div>
            </div>
        </div>
    )
}
