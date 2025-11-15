'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : '/placeholder-poster.jpg';

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block min-w-[150px] md:min-w-[200px] group"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
        {movie.poster_path ? (
          <Image
            src={posterUrl}
            alt={movie.title || 'Movie poster'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 150px, 200px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white text-sm font-semibold line-clamp-2">
              {movie.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

