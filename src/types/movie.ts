export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  genres?: Genre[];
  runtime?: number;
  vote_average?: number;
  vote_count?: number;
  status?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

