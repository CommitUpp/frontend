import { apiFetch, getErrorMessage } from "./client";

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
