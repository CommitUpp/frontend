import { apiFetch, getErrorMessage } from "./client";

export async function getGroupMovies(group_id: string) {
  const res = await apiFetch(`/groups/${group_id}/watched-movies`);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  const data = await res.json();
  console.log("[getGroupMovies] data", data);

  return data;
}
