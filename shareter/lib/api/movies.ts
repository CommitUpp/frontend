import { apiFetch, getErrorMessage } from "./client";

// 映画一覧を取得する関数
export async function getMovies() {
  const res = await apiFetch("/movies", {
    auth: false,
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  const data = await res.json();
  console.log("[getMovies] data", data);

  return data;
}

// 映画詳細を取得する関数
export async function getMovieDetails(movie_id: string, group_id: string) {
  const params = new URLSearchParams({
    group_id,
  });

  const res = await apiFetch(`/movies/${movie_id}?${params.toString()}`);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  const data = await res.json();
  console.log("[getMovieDetails] data", data);

  return data;
}
