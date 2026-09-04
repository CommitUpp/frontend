"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import LiveArea from "../components/live/LiveArea";
import Sidebar from "../components/Sidebar/Sidebar";
import AuthGate from "../components/AuthGate/AuthGate";
import MovieCard from "../components/MovieCard/MovieCard";
import { getGroupMovies } from "@/lib/api/groups";
import { getMovies } from "@/lib/api/movies";
import { useAuth } from "@/contexts/AuthContext";
import { useGroup } from "@/contexts/GroupContext";
import { movieRows } from "@/constants/movieRows";
import type { MoviesResponse } from "@/types/movies";
import styles from "./page.module.css";

type GroupMovie = {
  movie_id: string;
  title: string;
  trailer_url: string;
  watched_member: {
    avatar_url: string;
    user_id: string;
  }[];
};

type GroupMoviesResponse = {
  group_id: string;
  movies: GroupMovie[];
};

export default function Home() {
  const router = useRouter();
  const { session } = useAuth();
  const { selectedGroupId } = useGroup();

  const { data: moviesResponse } = useSWR<MoviesResponse>("movies", () => getMovies(), {
    onError: (error) => {
      console.error("[Home] getMovies failed", error);
    },
  });

  const groupMoviesKey: ["groupMovies", string] | null = selectedGroupId && session?.access_token
    ? ["groupMovies", selectedGroupId]
    : null;

  const { data: groupMoviesResponse } = useSWR<GroupMoviesResponse>(
    groupMoviesKey,
    ([, id]: ["groupMovies", string]) => getGroupMovies(id),
    {
      onError: (error) => {
        console.error("[Home] getGroupMovies failed", error);
      },
    }
  );

  const movies = useMemo(() => moviesResponse?.movies ?? [], [moviesResponse]);
  const groupMovies = useMemo(() => groupMoviesResponse?.movies ?? [], [groupMoviesResponse]);

  const rows = useMemo(() => {
    return movieRows
      .map((row) => ({
        title: row.displayName,
        movies: movies.filter((movie) => (
          Array.isArray(movie.genres) && movie.genres.includes(row.genre)
        )),
      }))
      .filter((row) => row.movies.length > 0);
  }, [movies]);

  const handleMovieClick = useCallback((movieId: string) => {
    if (!selectedGroupId) return;

    const params = new URLSearchParams({
      group_id: selectedGroupId,
    });

    router.push(`/movie/${movieId}?${params.toString()}`);
  }, [selectedGroupId, router]);

  return (
    <AuthGate unauthenticatedPath="/landing-page">
      <div className={styles.page_wrap}>
      <Sidebar />

      <div className={styles.main_wrap}>
        <div className={styles.live_wrap}>
          <LiveArea />
        </div>

        <div className={styles.recommend_wrap}>
          <section className={styles.row_section}>
            <div className={styles.row_header}>
              <h3>今夜何見る？</h3>
            </div>

            <div className={styles.movies_container}>
              {groupMovies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  title={movie.title}
                  imageUrl={movie.trailer_url}
                  watchers={movie.watched_member}
                  onClick={() => handleMovieClick(movie.movie_id)}
                />
              ))}
            </div>
          </section>

          {rows.map((row) => (
            <section key={row.title} className={styles.row_section}>
              <div className={styles.row_header}>
                <h3>{row.title}</h3>
              </div>

              <div className={styles.movies_container}>
                {row.movies.map((movie) => (
                  <MovieCard
                    key={movie.movie_id}
                    title={movie.title}
                    imageUrl={movie.trailer_url}
                    onClick={() => handleMovieClick(movie.movie_id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      </div>
    </AuthGate>
  );
}
