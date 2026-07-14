import { useEffect, useState } from "react";
import MovieHero from "../../components/movie/MovieHero";
import MovieSection from "../../components/movie/MovieSection";
import { getMovieGenres } from "../../services/genre.service";
import HeroSkeleton from "../../components/skeleton/HeroSkeleton";
import MovieSectionSkeleton from "../../components/skeleton/MovieSectionSkeleton";
import "../../styles/Skeleton.css";
import ErrorScreen from "../../components/common/ErrorScreen";
import "../../styles/ErrorScreen.css";


import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getIndianMovies,
} from "../../api/movie.api";
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
function Home() {
  const [heroMovies, setHeroMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [indianMovies, setIndianMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const now = await getNowPlayingMovies();
      const popular = await getPopularMovies();
      const upcomingData = await getUpcomingMovies();
      const indianData = await getIndianMovies();
      const genreData = await getMovieGenres();
      const nowMovies = now.movies || now;
      const popularMovies = popular.movies || popular;
      const upcomingMovies = upcomingData.movies || upcomingData;
      const indianMovieList = indianData.movies || indianData;
      setTrending(popularMovies);

      console.log("Now Playing loaded");

      const moviesWithPoster = nowMovies.filter(
        (movie) => movie.poster_path
      );

      const heroMovieList = nowMovies.filter(
        (movie) => movie.poster_path && movie.backdrop_path
      );

      setNowPlaying(moviesWithPoster);
      setHeroMovies(heroMovieList);

      setTrending(popularMovies);
      setUpcoming(upcomingMovies);
      setIndianMovies(indianMovieList);
      setGenres(genreData);

      setError(false);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load homepage data:", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
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

  if (loading) {
    return (
      <>
        <HeroSkeleton />
        <MovieSectionSkeleton />
        <MovieSectionSkeleton />
        <MovieSectionSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <ErrorScreen
        message="Unable to load movies. Please check your internet connection and try again."
        onRetry={() => {
          setError(false);
          setLoading(true);
          fetchData();
        }}
      />
    );
  }

  return (
    <>
      {heroMovies.length > 0 && (
        <MovieHero movies={heroMovies} genres={genres} />
      )}

      <MovieSection
        title="Now Showing"
        movies={nowPlaying}
        genres={genres}
      />

      <MovieSection
        title="🇮🇳 Popular in India"
        movies={indianMovies}
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