"use client";
import { useState } from "react";
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

  const [selectedChannelId, setSelectedChannelId] =
    useState("harry-potter");

  const selectedChannel = channels.find(
    (channel) => channel.id === selectedChannelId
  );

  return (
    <div className={styles.page_wrap}>
      <Sidebar
        selectedChannelId={selectedChannelId}
        onSelectChannel={setSelectedChannelId}
      />

      <h1 style={{ color: "#000", fontSize: "32px" }}>
        {selectedChannelId}
      </h1>

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