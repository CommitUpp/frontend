"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import LiveArea from "./components/live/LiveArea";
import Sidebar from "./components/Sidebar/Sidebar";
import { mockGroupMoviesResponse } from "@/mock/group-movies";
import { mockMoviesResponse } from "@/mock/movies";
import { mockWatchersResponse } from "@/mock/watchers";

import { getGroupMovies } from "@/lib/api/groups";
import { getMovies } from "@/lib/api/movies";
import { supabase } from "@/lib/supabase";
import { movieRows } from "@/constants/movieRows";
import type { MoviesResponse } from "@/types/movies";
import styles from "./page.module.css";

type GroupMovie = {
  movie_id: string;
  title: string;
  trailer_url: string;
};

type GroupMoviesResponse = {
  movies: GroupMovie[];
};

export default function Home() {
  const router = useRouter();
  const groupId = "4bb618e1-1fc2-457b-b635-bde0b1df667b";

  const { data: moviesResponse } = useSWR<MoviesResponse>("movies", getMovies, {
    onError: (error) => {
      console.error("[Home] getMovies failed", error);
    },
  });

  const { data: session } = useSWR("supabase-session", async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }, {
    onError: (error) => {
      console.error("[Home] getSession failed", error);
    },
  });

  const { data: groupMoviesResponse } = useSWR<GroupMoviesResponse>(
    groupId && session?.access_token ? ["groupMovies", groupId] : null,
    ([, id]) => getGroupMovies(id),
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
          <section className={styles.row_section}>
            <div className={styles.row_header}>
              <h3>今夜何見る？</h3>
            </div>

            <div className={styles.movies_container}>
              {groupMovies.map((movie) => {
                const watchers = mockWatchersResponse[movie.movie_id] ?? [];

                return (
                  <div
                    key={movie.movie_id}
                    className={styles.movie_wrap}
                    onClick={() => router.push(`/movie/${movie.movie_id}`)}
                  >
                    <div className={styles.poster_wrap}>
                      <Image
                        src={movie.trailer_url}
                        alt={movie.title}
                        width={220}
                        height={320}
                        className={styles.movie_image}
                      />

                      {watchers.length > 0 && (
                        <div className={styles.watcher_icons}>
                          {watchers.slice(0, 3).map((watcher) => (
                            <Image
                              key={watcher.id}
                              src={watcher.avatar_url}
                              alt=""
                              width={32}
                              height={32}
                              className={styles.watcher_icon}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className={styles.movie_name}>{movie.title}</p>
                  </div>
                );
              })}
              {groupMovies.map((movie) => (
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

          {rows.map((row) => (
            <section key={row.title} className={styles.row_section}>
              <div className={styles.row_header}>
                <h3>{row.title}</h3>
              </div>

              <div className={styles.movies_container}>

                {row.movies.map((movie) => {
                  const watchers = mockWatchersResponse[movie.movie_id] ?? [];

                  return (
                    <div
                      key={movie.movie_id}
                      className={styles.movie_wrap}
                      onClick={onSelectMovie}
                    >
                      <div className={styles.poster_wrap}>
                        <Image
                          src={movie.trailer_url}
                          alt={movie.title}
                          width={220}
                          height={320}
                          className={styles.movie_image}
                        />

                        {watchers.length > 0 && (
                          <div className={styles.watcher_icons}>
                            {watchers.slice(0, 3).map((watcher) => (
                              <Image
                                key={watcher.id}
                                src={watcher.avatar_url}
                                alt=""
                                width={32}
                                height={32}
                                className={styles.watcher_icon}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <p className={styles.movie_name}>{movie.title}</p>
                    </div>
                  );
                })}
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
