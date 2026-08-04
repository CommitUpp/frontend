"use client";

import { useState } from "react";

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

const channels = [
  {
    id: "harry-potter",
    name: "ハリーポッター賢者の石",
    messages: [
      {
        user: "やまけん",
        text: "この伏線そんな回収の仕方ある？！ってなった",
      },
      {
        user: "りょうと",
        text: "しかも途中ちょっと怖かったのに、変なところで笑わせてくるのずるい",
      },
    ],
  },
  {
    id: "avengers-civil-war",
    name: "アベンジャーズ シビル・ウォー",
    messages: [
      {
        user: "けんた",
        text: "最後の戦いめっちゃ熱かった",
      },
      {
        user: "りょうと",
        text: "キャップ派かアイアンマン派かで揉めそう笑",
      },
    ],
  },
  {
    id: "ironman-3",
    name: "アイアンマン3",
    messages: [
      {
        user: "やまけん",
        text: "スーツが大量に飛んでくるシーン好き",
      },
    ],
  },
];

type GroupMoviesResponse = {
  group_id: string;
  movies: GroupMovie[];
};

export default function Home() {
  const router = useRouter();
  const { session } = useAuth();
  const groupId = "4bb618e1-1fc2-457b-b635-bde0b1df667b";

  const { data: moviesResponse } = useSWR<MoviesResponse>("movies", getMovies, {
    onError: (error) => {
      console.error("[Home] getMovies failed", error);
    },
  });

  const groupMoviesKey: ["groupMovies", string] | null = groupId && session?.access_token
    ? ["groupMovies", groupId]
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
    const params = new URLSearchParams({
      group_id: groupId,
    });

    router.push(`/movie/${movieId}?${params.toString()}`);
  }, [groupId, router]);

  const [selectedChannelId, setSelectedChannelId] =
    useState("harry-potter");

  const selectedChannel = channels.find(
    (channel) => channel.id === selectedChannelId
  );

  return (
    <AuthGate unauthenticatedPath="/landing-page">
      <div className={styles.page_wrap}>
      <Sidebar
        selectedChannelId={selectedChannelId}
        onSelectChannel={setSelectedChannelId}
      />

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
