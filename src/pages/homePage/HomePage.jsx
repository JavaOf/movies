  import { useState, useEffect } from 'react';
  import { useTranslation } from 'react-i18next';
  import { useDispatch, useSelector } from 'react-redux';
  import {
    getCategoriesFilms,
    getCategoriesSeries,
    getPopularMovies,
    getTopRatedSeries,
    getNowPlayingMovies,
    getTopActors,
  } from '../../app/store/slices/categoriesSlice/categoriesThunk';
  import { CategoriesMovies } from '../../widgets/categoriesMovies/CategoriesMovies';
  import { Banner } from '../../widgets/banner/Banner';
  import './homePage.scss';

  export const HomePage = () => {
    const { t } = useTranslation();

    const years = [
      2010, 2011, 2012, 2013, 2014, 2015, 2016,
      2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
    ];

    const {
      filmsByYear,
      seriesByYear,
      popularMovies,
      topRatedSeries,
      nowPlayingMovies,
      topActors,
      loading,
      error,
    } = useSelector((state) => state.categories);

    const dispatch = useDispatch();

    const [selectedFilmsYear, setSelectedFilmsYear] = useState(years[0]);
    const [selectedSeriesYear, setSelectedSeriesYear] = useState(years[0]);

    useEffect(() => {
      dispatch(getCategoriesFilms(selectedFilmsYear));
      dispatch(getCategoriesSeries(selectedSeriesYear));
      dispatch(getPopularMovies());
      dispatch(getTopRatedSeries());
      dispatch(getNowPlayingMovies());
      dispatch(getTopActors());
    }, [dispatch, selectedFilmsYear, selectedSeriesYear]);


    return (
      <div>

        <Banner />

        
        <CategoriesMovies
          selectedYear={selectedFilmsYear}
          categoriesState={filmsByYear}
          handleYearGet={(year) => {
            setSelectedFilmsYear(year);
            dispatch(getCategoriesFilms(year));
          }}
          years={years}
          type={t('movies_by_year')}
          loading={loading}
          error={error}
        />

        <CategoriesMovies
          selectedYear={selectedSeriesYear}
          categoriesState={seriesByYear}
          handleYearGet={(year) => {
            setSelectedSeriesYear(year);
            dispatch(getCategoriesSeries(year));
          }}
          years={years}
          type={t('tv_series_by_year')}
          loading={loading}
          error={error}
        />

        <CategoriesMovies
          selectedYear={null}
          categoriesState={{ all: popularMovies }}
          handleYearGet={() => {}}
          years={[]}
          type={t('popular_films')}
        />

        <CategoriesMovies
          selectedYear={null}
          categoriesState={{ all: topRatedSeries }}
          handleYearGet={() => {}}
          years={[]}
          type={t('top_tv_series')}
        />

        <CategoriesMovies
          selectedYear={null}
          categoriesState={{ all: nowPlayingMovies }}
          handleYearGet={() => {}}
          years={[]}
          type={t('now_at_the_cinema')}
        />

        <CategoriesMovies
          selectedYear={null}
          categoriesState={{ all: topActors }}
          handleYearGet={() => {}}
          years={[]}
          type={t('best_actors')}
        />
      </div>
    );
  };
