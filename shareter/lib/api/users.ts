import { apiFetch, getErrorMessage } from "./client";

// 映画の視聴状況を更新する関数
export async function postMovieStatus(movieId: string, status: string) {
  const res = await apiFetch("/user/movie/status", {
    method: "POST",
    body: JSON.stringify({ movie_id: movieId, status: status }),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  const data = await res.json();
  console.log("[postMovieStatus] data", data);

  return data;
}
