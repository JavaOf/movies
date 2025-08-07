import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopularMovies } from '../../app/store/slices/bannerSlices/bannerThunk';
import { PopularCard } from '../../entities/popularCard/PopularCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { addToSave } from '../../app/store/slices/saveSlices/saveSlice';
import { Link } from 'react-router-dom';
import { SkeletonCart } from '../../shared/assets/skeletonCart/SkeletonCart';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './banner.scss';

export const Banner = () => {
  const { popularState, popularError, popularLoading } = useSelector(s => s.bannerSlice);
  const [activeIndex, setActiveIndex] = useState(0);
  const saveList = useSelector(s => s.saveSlice);
  const [activeCard, setActiveCard] = useState(null);
  const [isPaginationEnabled, setIsPaginationEnabled] = useState(window.innerWidth > 576);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());

    const handleResize = () => {
      setIsPaginationEnabled(window.innerWidth > 576);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const movie = popularState?.results || [];

  return (
    <section className='banner'>
      <img
        className='banner-background'
        src={`https://image.tmdb.org/t/p/w500/${movie[activeIndex]?.backdrop_path}`}
        alt={movie[activeIndex]?.title}
      />
      <div className="container-max">
        <Swiper
          className="banner__content"
          slidesPerView={3.5}
          spaceBetween={30}
          centeredSlides={true}
          grabCursor={true}
          initialSlide={2}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            360: {
              slidesPerView: 1.8,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
          }}
          pagination={isPaginationEnabled ? { clickable: true } : false}
          navigation
          onSlideChange={(e) => setActiveIndex(e.realIndex)}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
        >
          {popularState?.results?.map((item) => {
            return (
              <SwiperSlide key={item?.id}>
                {popularLoading ? (
                  <SkeletonCart type={"banner"} />
                ) : (
                  <Link to={`/card/${item?.id}`}>
                    <PopularCard
                      activeCard={activeCard}
                      setActiveCard={setActiveCard}
                      handleAddToSave={() => dispatch(addToSave(item))}
                      {...item}
                    />
                  </Link>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
