import api from "../constants/api";
import { TMDB_API_KEY } from "../constants/api";

export const getMovieGenres = async () => {
    const response = await api.get("/genre/movie/list", {
        params: {
            api_key: TMDB_API_KEY,
        },
    });

    return response.data.genres;
};