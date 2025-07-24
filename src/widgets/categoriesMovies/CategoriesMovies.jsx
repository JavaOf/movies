import { Swiper, SwiperSlide } from 'swiper/react';
import { MdNavigateNext } from "react-icons/md";
import { DefaultCard } from '../../entities/defaultCard/DefaultCard';
import { useState } from 'react';
import { HoverDefaultCard } from '../../entities/hoverDefaultCard/HoverDefaultCard';
import './categoriesMovies.scss';
import 'swiper/css';


export const CategoriesMovies = ({ years, selectedYear, handleYearGet, categoriesState, type = 'null' }) => {
    console.log(categoriesState);

    return (
        <section className='categories-films container'>
            <div className="categories-films__top">
                <h2 className="categories-films__top-title">{type} - {selectedYear}</h2>
                <span className="categories-films__top-next"><MdNavigateNext /></span>
            </div>

            <div className='categories-films__content'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={7.5}
                    breakpoints={{
                        768: {
                            slidesPerView: 5
                        },
                        0: {
                            slidesPerView: 2.5
                        },
                        460: {
                            slidesPerView: 3.5
                        },
                        576: {
                            slidesPerView: 4
                        },
                        992: {
                            slidesPerView: 6
                        },
                        1200: {
                            slidesPerView: 8
                        }
                    }}
                    className="categories-films__header">
                    {years?.map((item, i) => {
                        return <SwiperSlide
                            onClick={() => handleYearGet(item)}
                            className="categories-films__header-btn"
                            key={i}
                        >{type} {item}</SwiperSlide>
                    })}
                </Swiper>
            </div>

            <div className='categories-films__content'>
                <Swiper
                    spaceBetween={15}
                    slidesPerView={9}
                    breakpoints={{
                        768: {
                            slidesPerView: 5
                        },
                        0: {
                            slidesPerView: 2.5
                        },
                        460: {
                            slidesPerView: 3.5
                        },
                        576: {
                            slidesPerView: 4
                        },
                        992: {
                            slidesPerView: 6
                        },
                        1200: {
                            slidesPerView: 8
                        }
                    }}
                >
                    {categoriesState?.undefined
                        ?.map((item) => {
                            return (
                                <SwiperSlide key={item?.id}>
                                    <DefaultCard {...item} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </div>
        </section>
    )
}
