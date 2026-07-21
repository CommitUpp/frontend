"use client";

import LiveArea from "./components/live/LiveArea";
import Sidebar from "./components/Sidebar/Sidebar";
import { useMemo } from "react";
import { mockGroupMoviesResponse } from "@/mock/group-movies";
import { mockMoviesResponse } from "@/mock/movies";
import { movieRows } from "@/constants/movieRows";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

type Props = {
  onSelectMovie: () => void;
};

export default function Home({ onSelectMovie }: Props) {
  const groupMovies = mockGroupMoviesResponse.movies;
  const movies = mockMoviesResponse.movies;
  const router = useRouter();

  const rows = useMemo(() => {
    return movieRows
      .map((row) => ({
        title: row.displayName,
        movies: movies.filter((movie) => movie.genres.includes(row.genre)),
      }))
      .filter((row) => row.movies.length > 0);
  }, [movies]);

  // 後にAPIに差し替える
  const mockUser = {
    id: "u1",
    name: "テストユーザー",
    initials: "テ",
    avatarUrl: undefined,
  };

  return (
    <div className={styles.page_wrap}>
      <Sidebar />

      <div className={styles.main_wrap}>
        <div className={styles.live_wrap}>
          <LiveArea
            currentUser={mockUser}
            remainingWatchCount={1}
            isPremium={false}
          />
        </div>

        <div className={styles.recommend_wrap}>
          <section className={styles.row_section}>
            <div className={styles.row_header}>
              <h3>今夜何見る？</h3>
            </div>

            <div className={styles.movies_container}>
              {groupMovies.map((movie) => (
                <div
                  key={movie.movie_id}
                  className={styles.movie_wrap}
                  onClick={() => router.push(`/movie/${movie.movie_id}`)}
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

          {rows.map((row, index) => (
            <section key={index} className={styles.row_section}>
              <div className={styles.row_header}>
                <h3>{row.title}</h3>
              </div>

              <div className={styles.movies_container}>
                {row.movies.map((movie) => (
                  <div
                    key={movie.movie_id}
                    className={styles.movie_wrap}
                    onClick={onSelectMovie}
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