"use client";

import Link from "next/link";
import { mockMoviesResponse } from "@/mock/movies";
import styles from "./MovieSearch.module.css";

export default function MovieSearch() {
    return (
        <div className={styles.search_wrap}>
            <div className={styles.main_container}>
                <div className={styles.mvsearch_wrap}>
                    <h2>
                        作品検索
                    </h2>

                    <input
                        type="text"
                        placeholder="見たい映画を検索してください"
                        className={styles.search_input}
                    />
                </div>

                <div className={styles.result_list}>
                    {mockMoviesResponse.movies.map((movie) => (
                        <Link
                            key={movie.movie_id}
                            href={`/movie/${movie.movie_id}`}
                            className={styles.result_item}
                        >
                            {movie.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}