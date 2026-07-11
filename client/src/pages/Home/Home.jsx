import MovieHero from "../../components/movie/MovieHero";
import MovieSection from "../../components/movie/MovieSection";
import { nowShowing, trending, comingSoon } from "../../constants/movies";

function Home() {
  return (
    <>
      <MovieHero />

      <MovieSection
        title="Now Showing"
        movies={nowShowing}
      />

      <MovieSection
        title="Trending"
        movies={trending}
      />

      <MovieSection
        title="Coming Soon"
        movies={comingSoon}
      />
    </>
  );
}
export default Home;