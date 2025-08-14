import { Swiper, SwiperSlide } from 'swiper/react';
import { MdNavigateNext } from 'react-icons/md';
import { DefaultCard } from '../../entities/defaultCard/DefaultCard';
import { SkeletonCart } from '../../shared/assets/skeletonCart/SkeletonCart';
import { Link } from 'react-router-dom';
import './categoriesMovies.scss';
import 'swiper/css';

// Map category types to TMDB genre IDs
const genreMap = {
  movies_by_year: 28, // Action
  tv_series_by_year: 10765, // Sci-Fi & Fantasy
  popular_films: 12, // Adventure
  top_tv_series: 35, // Comedy
  now_at_the_cinema: 18, // Drama
  best_actors: 99, // Documentary (or another relevant ID)
};

export const CategoriesMovies = ({
  years,
  selectedYear,
  handleYearGet,
  categoriesState,
  type = 'unknown',
  loading,
}) => {
  const movies = selectedYear != null
    ? categoriesState[selectedYear]
    : categoriesState['all'] || categoriesState;

  // Get the genre ID for the category type
  const genreId = genreMap[type.toLowerCase()] || 28; // Fallback to Action if type not found

  return (
    <section className="categories-films container">
      <div className="categories-films__top">
        <h2 className="categories-films__top-title">
          {type} {selectedYear ? `- ${selectedYear}` : ''}
        </h2>
        <Link
          to={`/detail/${genreId}`} // Use genreId instead of type
          className="categories-films__top-next"
        >
          <MdNavigateNext />
        </Link>
      </div>

      {years?.length > 0 && (
        <div className="categories-films__content">
          <Swiper
            spaceBetween={30}
            slidesPerView={7.5}
            breakpoints={{
              0: { slidesPerView: 2.5 },
              460: { slidesPerView: 3.5 },
              576: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              992: { slidesPerView: 6 },
              1200: { slidesPerView: 8 },
            }}
            className="categories-films__header"
          >
            {years.map((year, i) => (
              <SwiperSlide
                key={i}
                onClick={() => handleYearGet(year)}
                className={`categories-films__header-btn ${selectedYear === year ? 'active' : ''}`}
              >
                {year}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="categories-films__content">
        <Swiper
          spaceBetween={15}
          slidesPerView={9}
          breakpoints={{
            0: { slidesPerView: 2.5 },
            460: { slidesPerView: 3.5 },
            576: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            992: { slidesPerView: 6 },
            1200: { slidesPerView: 8 },
          }}
        >
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                {loading ? (
                  <SkeletonCart />
                ) : (
                  <DefaultCard {...item} />
                )}
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p>Нет данных {selectedYear && `за ${selectedYear}`}</p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
};