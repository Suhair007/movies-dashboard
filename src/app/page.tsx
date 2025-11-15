import { fetchPopular, fetchNowPlaying, fetchTopRated } from '../lib/tmdb';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';

export default async function Home() {
  try {
    // Fetch all movie categories in parallel
    const [popularData, nowPlayingData, topRatedData] = await Promise.all([
      fetchPopular(),
      fetchNowPlaying(),
      fetchTopRated(),
    ]);

    const popularMovies = popularData.results || [];
    const nowPlayingMovies = nowPlayingData.results || [];
    const topRatedMovies = topRatedData.results || [];

    const heroMovie = popularMovies[0];

    return (
      <div className="min-h-screen bg-black">
        {heroMovie && <HeroBanner movie={heroMovie} />}
        <div className="py-8">
          {popularMovies.length > 0 && (
            <MovieRow movies={popularMovies} categoryTitle="Popular Movies" />
          )}
          {nowPlayingMovies.length > 0 && (
            <MovieRow movies={nowPlayingMovies} categoryTitle="Now Playing" />
          )}
          {topRatedMovies.length > 0 && (
            <MovieRow movies={topRatedMovies} categoryTitle="Top Rated" />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Error Loading Movies</h1>
          <p className="text-gray-400">
            Please check your TMDB_API_KEY in .env.local
          </p>
        </div>
      </div>
    );
  }
}
