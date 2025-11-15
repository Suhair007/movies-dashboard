import { Movie, MovieDetail, ApiResponse } from '@/types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is not set in environment variables');
}

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  
  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from TMDB: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchPopular(): Promise<ApiResponse<Movie>> {
  return fetchFromTMDB<ApiResponse<Movie>>('/movie/popular');
}

export async function fetchNowPlaying(): Promise<ApiResponse<Movie>> {
  return fetchFromTMDB<ApiResponse<Movie>>('/movie/now_playing');
}

export async function fetchTopRated(): Promise<ApiResponse<Movie>> {
  return fetchFromTMDB<ApiResponse<Movie>>('/movie/top_rated');
}

export async function fetchMovieById(id: string): Promise<MovieDetail> {
  return fetchFromTMDB<MovieDetail>(`/movie/${id}`);
}

