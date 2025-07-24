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
