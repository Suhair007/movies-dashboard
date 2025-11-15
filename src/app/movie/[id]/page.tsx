import { fetchMovieById } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const movie = await fetchMovieById(id);
    
    if (!movie) {
      return {
        title: 'Movie Not Found',
      };
    }

    return {
      title: `${movie.title} | Streaming Dashboard`,
      description: movie.overview || `Details for ${movie.title}`,
      openGraph: {
        title: movie.title,
        description: movie.overview || '',
        images: movie.poster_path ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`] : [],
      },
    };
  } catch {
    return {
      title: 'Movie Not Found',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  try {
    const movie = await fetchMovieById(id);

    if (!movie) {
      notFound();
    }

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

    const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null;

    const formatRuntime = (minutes?: number) => {
      if (!minutes) return 'N/A';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const formatDate = (dateString?: string) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Backdrop Image */}
        {backdropUrl && (
          <div className="relative h-[50vh] w-full">
            <Image
              src={backdropUrl}
              alt={movie.title || 'Movie backdrop'}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          </div>
        )}

        <div className="container mx-auto px-4 md:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            aria-label="Go back to home page"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              {posterUrl ? (
                <div className="relative w-full max-w-[300px] aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src={posterUrl}
                    alt={movie.title || 'Movie poster'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full max-w-[300px] aspect-[2/3] rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-xl text-gray-400 italic mb-6">
                  {movie.tagline}
                </p>
              )}

              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                {movie.release_date && (
                  <div>
                    <span className="text-gray-400">Release Date: </span>
                    <span className="text-white">{formatDate(movie.release_date)}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div>
                    <span className="text-gray-400">Runtime: </span>
                    <span className="text-white">{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                {movie.vote_average !== undefined && (
                  <div>
                    <span className="text-gray-400">Rating: </span>
                    <span className="text-white">
                      {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-red-600 text-white rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {movie.overview && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                {movie.status && (
                  <div>
                    <span className="text-gray-400">Status: </span>
                    <span className="text-white">{movie.status}</span>
                  </div>
                )}
                {movie.vote_count !== undefined && (
                  <div>
                    <span className="text-gray-400">Vote Count: </span>
                    <span className="text-white">
                      {movie.vote_count.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    notFound();
  }
}

