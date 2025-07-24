import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopularMovies } from '../../app/store/slices/bannerSlices/bannerThunk';
import { PopularCard } from '../../entities/popularCard/PopularCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { addToSave } from '../../app/store/slices/saveSlices/saveSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './banner.scss';
import { Link } from 'react-router-dom';

export const Banner = () => {
  const { popularState, popularError, popularLoading } = useSelector(s => s.bannerSlice);
  const [activeIndex, setActiveIndex] = useState(0);
  const saveList = useSelector(s => s.saveSlice);
  const [activeCard, setActiveCard] = useState(null);
  const dispatch = useDispatch();
  console.log(saveList)
  // console.log(popularState)

  useEffect(() => {
    dispatch(getPopularMovies());
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
          spaceBetween={40}
          centeredSlides={true}
          grabCursor={true}
          initialSlide={1}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{
            clickable: true,
          }}
          navigation
          onSlideChange={(e) => setActiveIndex(e.realIndex)}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true
          }}
        >
          {popularState?.results?.map((item) => {
            return (
              <SwiperSlide key={item?.id}>
                <Link to={`/card/${item?.id}`}>
                <PopularCard
                  activeCard={activeCard}
                  setActiveCard={setActiveCard}
                  handleAddToSave={() => dispatch(addToSave(item))}
                  {...item}
                />
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
