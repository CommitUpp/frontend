import { apiFetch, getErrorMessage } from "./client";
import type { MoviesResponse } from "@/types/movies";

// 映画の視聴状況を更新する関数
export async function postMovieStatus(movieId: string, status: string) {
  const res = await apiFetch("/user/movie/status", {
    method: "POST",
    body: JSON.stringify({ movie_id: movieId, status: status }),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

// 映画の視聴状況を取得する関数
export async function getMovieStatus(status: string): Promise<MoviesResponse> {
  const params = new URLSearchParams({ status });
  const res = await apiFetch(`/user/movie/status?${params.toString()}`);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

// お気に入りの映画を取得する関数
export async function getFavoriteMovies(): Promise<MoviesResponse> {
  const res = await apiFetch("/user/favorite-movies");

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}
