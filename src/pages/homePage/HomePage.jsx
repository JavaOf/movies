import { useState, useEffect } from 'react';
import { getCategoriesFilms } from '../../app/store/slices/categoriesFilmsSlice/categoriesFilmsThunk';
import { getCategoriesSeries } from '../../app/store/slices/categoriesSeriesSlice/categoriesSeriesThunk';
import { CategoriesMovies } from '../../widgets/categoriesMovies/CategoriesMovies';
import { Banner } from '../../widgets/banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import './homePage.scss';

export const HomePage = () => {
  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

  const {
    categoriesFilmsState,
    categoriesFilmsLoading,
    categoriesFilmsError
  } = useSelector(s => s.categoriesFilmsSlice);

  const {
    categoriesSeriesState,
    categoriesSeriesLoading,
    categoriesSeriesError
  } = useSelector(s => s.categoriesSeriesSlice);

  const dispatch = useDispatch();

  const [selectedFilmsYear, setSelectedFilmsYear] = useState(years[0]);
  const [selectedSeriesYear, setSelectedSeriesYear] = useState(years[0]);

  const initialYear = years[0];

  useEffect(() => {
    dispatch(getCategoriesFilms(initialYear));
    dispatch(getCategoriesSeries(initialYear));
  }, [dispatch, initialYear]); 

  const handleYearFilmsGet = (year) => {
    setSelectedFilmsYear(year);
    dispatch(getCategoriesFilms(year));
  };

  const handleYearSeriesGet = (year) => {
    setSelectedSeriesYear(year);
    dispatch(getCategoriesSeries(year));
  };

  return (
    <div>
      <Banner />

      <CategoriesMovies
        selectedYear={selectedFilmsYear}
        categoriesState={categoriesFilmsState}
        handleYearGet={handleYearFilmsGet}
        years={years}
        type='Films'
      />

      <CategoriesMovies
        selectedYear={selectedSeriesYear}
        categoriesState={categoriesSeriesState}
        handleYearGet={handleYearSeriesGet}
        years={years}
        type='Series'
      />
    </div>
  );
};
