const BASE_URL = "https://api.themoviedb.org/3";

const request = async (endpoint, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                    accept: "application/json",
                },
                signal: AbortSignal.timeout(10000),
            });

            if (!response.ok) {
                throw new Error(`TMDB Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (attempt === retries) {
                throw error;
            }

            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    }
};

export const getNowPlayingFromTMDB = async () => {
    const data = await request("/movie/now_playing");
    return data.results;
};

const mergeMovies = (globalMovies, indianMovies) => {
    const unique = new Map();

    [...globalMovies, ...indianMovies].forEach((movie) => {
        unique.set(movie.id, movie);
    });

    return [...unique.values()].sort(() => Math.random() - 0.5);
};

export const getNowPlayingMovies = async () => {
    const globalMovies = await getNowPlayingFromTMDB();
    const indianMovies = await getIndianMovies();

    return mergeMovies(globalMovies, indianMovies);
};

export const getPopularMovies = async () => {
    const globalData = await request("/movie/popular");
    const indianMovies = await getIndianMovies();

    return mergeMovies(globalData.results, indianMovies);
};

export const getUpcomingMovies = async () => {
    const globalData = await request("/movie/upcoming");
    const indianMovies = await getIndianMovies();

    return mergeMovies(globalData.results, indianMovies);
};

export const getTopRatedMovies = async () => {
    const data = await request("/movie/top_rated");
    return data.results;
};

export const getMovieDetails = async (id) => {
    return await request(`/movie/${id}`);
};
export const getMovieGenres = async () => {
    const data = await request("/genre/movie/list");
    return data.genres;
};
export const getIndianMovies = async () => {
    const languages = ["hi"];

    const responses = await Promise.all(
        languages.map((lang) =>
            request(
                `/discover/movie?with_original_language=${lang}&sort_by=popularity.desc&vote_count.gte=20`
            )
        )
    );

    const hindiMovies = responses[0].results.filter(
        (movie) => movie.original_language === "hi"
    );

    const unique = new Map();

    hindiMovies.forEach((movie) => {
        unique.set(movie.id, movie);
    });

    return [...unique.values()];
};