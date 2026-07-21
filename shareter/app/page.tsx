"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import LiveArea from "./components/live/LiveArea";
import Sidebar from "./components/Sidebar/Sidebar";
import { movieRows } from "@/constants/movieRows";
import { getMovies } from "@/lib/api/movies";
import type { MoviesResponse } from "@/types/movies";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const groupId = "4bb618e1-1fc2-457b-b635-bde0b1df667b";

  const { data: moviesResponse } = useSWR<MoviesResponse>("movies", getMovies, {
    onError: (error) => {
      console.error("[Home] getMovies failed", error);
    },
  });

  const movies = useMemo(() => moviesResponse?.movies ?? [], [moviesResponse]);

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
    const params = new URLSearchParams({
      group_id: groupId,
    });

    router.push(`/movie/${movieId}?${params.toString()}`);
  }, [groupId, router]);

  return (
    <div className={styles.page_wrap}>
      <Sidebar />

      <div className={styles.main_wrap}>
        <div className={styles.live_wrap}>
          <LiveArea />
        </div>

        <div className={styles.recommend_wrap}>
          {rows.map((row) => (
            <section key={row.title} className={styles.row_section}>
              <div className={styles.row_header}>
                <h3>{row.title}</h3>
              </div>

              <div className={styles.movies_container}>
                {row.movies.map((movie) => (
                  <div
                    key={movie.movie_id}
                    className={styles.movie_wrap}
                    onClick={() => handleMovieClick(movie.movie_id)}
                  >
                    <Image
                      src={movie.trailer_url}
                      alt={movie.title}
                      width={220}
                      height={320}
                      className={styles.movie_image}
                    />

                    <p className={styles.movie_name}>{movie.title}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
