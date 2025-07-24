import axios from 'axios';
import { BASE_API } from './baseApi';

const axiosApi = axios.create({
  baseURL: BASE_API,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjRlODMzYWE3OTFmMTE0MjBlYTU0OTcwODNiYzRlNiIsIm5iZiI6MTc0ODMyOTY5OS41MTMsInN1YiI6IjY4MzU2NGUzZTViOGQwNjQxMzA1NWJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NuOLe6sE51XrusXaDXZL8XdCHPm3xrUy7PVHZiId8j0'
  }
});

export default axiosApi;