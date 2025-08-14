import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../../app/store/slices/detailSlice/detailThunk';
import { DefaultCard } from '../../entities/defaultCard/DefaultCard';
import './detailPage.scss';

export const DetailPage = () => {
  const { genreId } = useParams();
  const dispatch = useDispatch();
  const { detailState, loading, error } = useSelector((state) => state.detailSlice);

  const { movies = [], currentPage = 1, totalPages = 1 } = detailState[genreId] || {};

  useEffect(() => {
    if (genreId) dispatch(getDetail({ genreId, page: 1 }));
  }, [genreId, dispatch]);

  const handlePageClick = (page) => {
    if (page && page !== currentPage && page >= 1 && page <= totalPages) {
      dispatch(getDetail({ genreId, page }));
    }
  };

  const paginationArray = [
    { label: 'Prev', page: currentPage - 1, disabled: currentPage === 1 },
    ...(totalPages <= 5
      ? Array.from({ length: totalPages }, (_, i) => ({ label: i + 1, page: i + 1, disabled: i + 1 === currentPage }))
      : [
          { label: 1, page: 1, disabled: currentPage === 1 },
          ...(currentPage > 3 ? [{ label: '...', page: null, disabled: true }] : []),
          ...Array.from(
            { length: Math.min(3, totalPages - 2) },
            (_, i) => {
              const pageNum = Math.max(2, currentPage - 1) + i;
              return { label: pageNum, page: pageNum, disabled: pageNum === currentPage };
            }
          ),
          ...(currentPage < totalPages - 2 ? [{ label: '...', page: null, disabled: true }] : []),
          { label: totalPages, page: totalPages, disabled: currentPage === totalPages },
        ]),
    { label: 'Next', page: currentPage + 1, disabled: currentPage === totalPages },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="detail-page container">
      <h2 className="detail-page-title">{genreId}</h2>
      <div className="detail-page__content">
        {movies.map((item) => <DefaultCard key={item.id} {...item} />)}
      </div>

      <div className="pagination">
        {paginationArray.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handlePageClick(btn.page)}
            disabled={btn.disabled}
            className={`pagination-btn ${btn.disabled ? 'disabled' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
