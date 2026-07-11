import { useEffect, useState } from "react";
import MovieHero from "../../components/movie/MovieHero";
import MovieSection from "../../components/movie/MovieSection";
import {
  getNowPlayingMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "../../services/movie.service";
import { getMovieGenres } from "../../services/genre.service";

function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [now, trend, upcomingData, genreData] = await Promise.all([
        getNowPlayingMovies(),
        getTrendingMovies(),
        getUpcomingMovies(),
        getMovieGenres(),
      ]);

      setNowPlaying(now.results || now);
      setTrending(trend.results || trend);
      setUpcoming(upcomingData.results || upcomingData);
      setGenres(genreData);
    }

    fetchData();
  }, []);

  const filteredTrending = trending.filter(
    (movie) => !nowPlaying.some((nowMovie) => nowMovie.id === movie.id)
  );

  const filteredUpcoming = upcoming.filter(
    (movie) =>
      !nowPlaying.some((nowMovie) => nowMovie.id === movie.id) &&
      !filteredTrending.some((trendMovie) => trendMovie.id === movie.id)
  );

  return (
    <>
      {nowPlaying.length > 0 && (
        <MovieHero movies={nowPlaying} genres={genres} />
      )}

      <MovieSection
        title="Now Showing"
        movies={nowPlaying}
        genres={genres}
      />

      <MovieSection
        title="Trending"
        movies={filteredTrending}
        genres={genres}
      />

      <MovieSection
        title="Coming Soon"
        movies={filteredUpcoming}
        genres={genres}
      />
    </>
  );
}

export default Home;