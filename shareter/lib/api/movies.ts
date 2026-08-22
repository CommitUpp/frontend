import { apiFetch, getErrorMessage } from "./client";
import type { MoviesResponse } from "@/types/movies";

// 映画一覧を取得する関数
export async function getMovies(keyword?: string): Promise<MoviesResponse> {
  const params = new URLSearchParams();
  const normalizedKeyword = keyword?.trim();

  if (normalizedKeyword) {
    params.set("keyword", normalizedKeyword);
  }

  const queryString = params.toString();
  const path = queryString ? `/movies?${queryString}` : "/movies";

  const res = await apiFetch(path, {
    auth: false,
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
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

  return res.json();
}
