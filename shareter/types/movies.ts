export interface Movie {
  movie_id: string;
  trailer_url: string;
  title: string;
  tmdb_id: string;
  genres?: string[] | null;
  overview?: string;
  poster_url?: string;
  release_date?: string;
  updated_at?: string;
}

export interface MoviesResponse {
  movies: Movie[];
}
