export interface Movie {
  movie_id: string;
  trailer_url: string;
  title: string;
  tmdb_id: string;
  genres: string[];
}

export interface MoviesResponse {
  movies: Movie[];
}
