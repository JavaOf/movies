import { Swiper, SwiperSlide } from 'swiper/react';
import { MdNavigateNext } from "react-icons/md";
import { DefaultCard } from '../../entities/defaultCard/DefaultCard';
import './categoriesMovies.scss';
import 'swiper/css';

export const CategoriesMovies = ({
  years,
  selectedYear,
  handleYearGet,
  categoriesState,
  type = 'null'
}) => {
  const movies = selectedYear != null
    ? categoriesState[selectedYear]
    : categoriesState['all'] || categoriesState;

  return (
    <section className='categories-films container'>
      <div className="categories-films__top">
        <h2 className="categories-films__top-title">
          {type} {selectedYear ? `- ${selectedYear}` : ''}
        </h2>
        <span className="categories-films__top-next"><MdNavigateNext /></span>
      </div>

      {years?.length > 0 && (
        <div className='categories-films__content'>
          <Swiper
            spaceBetween={30}
            slidesPerView={7.5}
            breakpoints={{
              768: { slidesPerView: 5 },
              0: { slidesPerView: 2.5 },
              460: { slidesPerView: 3.5 },
              576: { slidesPerView: 4 },
              992: { slidesPerView: 6 },
              1200: { slidesPerView: 8 }
            }}
            className="categories-films__header"
          >
            {years.map((year, i) => (
              <SwiperSlide
                onClick={() => handleYearGet(year)}
                className="categories-films__header-btn"
                key={i}
              >
                {year}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className='categories-films__content'>
        <Swiper
          spaceBetween={15}
          slidesPerView={9}
          breakpoints={{
            768: { slidesPerView: 5 },
            0: { slidesPerView: 2.5 },
            460: { slidesPerView: 3.5 },
            576: { slidesPerView: 4 },
            992: { slidesPerView: 6 },
            1200: { slidesPerView: 8 }
          }}
        >
          {movies?.length ? (
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <DefaultCard {...item} />
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
