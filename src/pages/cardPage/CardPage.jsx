import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../shared/api/axiosApi';
import { IoArrowBackSharp } from "react-icons/io5";
import { DetailCard } from '../../entities/detailCard/DetailCard';
import { MdContentCopy } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { addToSave } from '../../app/store/slices/saveSlices/saveSlice';
import { useDispatch, useSelector } from 'react-redux';
import './cardPage.scss';

export const CardPage = () => {
    const [detail, setDetail] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {saveList} = useSelector(state => state.saveSlice);

    console.log(saveList)
    const getMovies = async () => {
        try {
            const response = await axiosApi.get(`movie/${params.id}`, {
                params: { language: 'ru-RU' }
            });
            setDetail(response.data);
        } catch (err) {
            console.error('Ошибка при получении данных: ', err);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    const handleCopy = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link)
            .then(() => alert('Ссылка скопирована!'))
            .catch(() => alert('Не удалось скопировать ссылку'));
    };

    const handleSave = () => {
        dispatch(addToSave(detail));
        alert('Добавлено в избранное!');
    };

    return (
        <>
            <div className="card-page__header container">
                <div className="card-page__header-wrapper">
                    <span onClick={() => navigate(-1)} className='card-page__header-wrapper-btn'>
                        <IoArrowBackSharp />
                    </span>
                </div>
                <div className="card-page__header-wrapper">
                    <span onClick={handleCopy} className='card-page__header-wrapper-btn'>
                        <MdContentCopy />
                    </span>
                    <span onClick={handleSave} className='card-page__header-wrapper-btn'>
                        <FiSave />
                    </span>
                </div>
            </div>
            <div className="card-page">
                <img
                    className='card-page__background'
                    src={`https://image.tmdb.org/t/p/w500${detail?.backdrop_path}`}
                    alt={detail?.title}
                />
                <div className="card-page__content container">
                    <DetailCard item={detail} />
                </div>
            </div>
        </>
    );
};
