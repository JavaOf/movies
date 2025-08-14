import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrailer } from '../../app/store/slices/detailSlice/detailThunk';
import './trailerPage.scss';

export const TrailerPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const trailers = useSelector(state => state.detailSlice.trailers);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      if (trailers[id]) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailers[id].key}`);
      } else {
        const action = await dispatch(getTrailer(id));
        if (action.payload?.trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${action.payload.trailer.key}`);
        } else {
          alert('Трейлер не найден');
        }
      }
    };
    fetchTrailer();
  }, [id, dispatch, trailers]);

  return (
    <div className="trailer-page container">
      {trailerUrl ? (
        <iframe
          width="100%"
          height="450"
          src={trailerUrl}
          title="Трейлер"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Загрузка трейлера...</p>
      )}
    </div>
  );
};
