import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../shared/api/axiosApi';

export const getDetail = createAsyncThunk(
  'detail/getDetail',
  async ({ genreId, page = 1 }, { rejectWithValue }) => {
    try {
      const lang = axiosApi.defaults.params?.language || 'en-US';
      const { data } = await axiosApi.get(`discover/movie`, {
        params: {
          with_genres: genreId,
          language: lang,
          page,
        },
      });
      return {
        genreId,
        movies: data.results,
        page,
        totalPages: data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTrailer = createAsyncThunk(
  'detail/getTrailer',
  async (movieId, { rejectWithValue }) => {
    try {
      const fetchVideos = async (lang) => {
        const { data } = await axiosApi.get(`movie/${movieId}/videos`, {
          params: { language: lang },
        });
        return data.results;
      };

      const currentLang = axiosApi.defaults.params?.language || 'en-US';
      let videos = await fetchVideos(currentLang);
      if (!videos || videos.length === 0) {
        videos = await fetchVideos('en-US');
      }

      const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      return { movieId, trailer };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
