"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import AuthGate from "../components/AuthGate/AuthGate";
import MovieCard from "../components/MovieCard/MovieCard";
import Sidebar from "../components/Sidebar/Sidebar";
import { getMovies } from "@/lib/api/movies";
import type { MoviesResponse } from "@/types/movies";
import styles from "./page.module.css";

const groupId = "4bb618e1-1fc2-457b-b635-bde0b1df667b";

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            setKeyword(query);
        }, 300);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [query]);

    const {
        data: moviesResponse,
        error,
        isLoading,
    } = useSWR<MoviesResponse>(
        ["movies", keyword],
        ([, nextKeyword]: [string, string]) => getMovies(nextKeyword),
        {
            onError: (fetchError) => {
                console.error("[SearchPage] getMovies failed", fetchError);
            },
        }
    );

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleMovieClick = (movieId: string) => {
        const params = new URLSearchParams({
            group_id: groupId,
        });

        router.push(`/movie/${movieId}?${params.toString()}`);
    };

    const movies = moviesResponse?.movies ?? [];
    const hasError = Boolean(error);
    const hasMovies = movies.length > 0;

    return (
        <AuthGate unauthenticatedPath="/landing-page">
            <div className={styles.page_wrap}>
                <Sidebar />

                <div className={styles.main_wrap}>
                    <div className={styles.search_wrap}>
                        <div className={styles.main_container}>
                            <section className={styles.mvsearch_wrap}>
                                <h2>作品検索</h2>

                                <input
                                    type="text"
                                    placeholder="見たい映画を検索してください"
                                    value={query}
                                    onChange={handleQueryChange}
                                    className={styles.search_input}
                                />
                            </section>

                            <section className={styles.result_wrap}>
                                {isLoading && (
                                    <p className={styles.loading_text}>
                                        取得中...
                                    </p>
                                )}

                                {!isLoading && hasError && (
                                    <p className={styles.empty_text}>
                                        作品の取得に失敗しました
                                    </p>
                                )}

                                {!isLoading && !hasError && !hasMovies && (
                                    <p className={styles.empty_text}>
                                        該当する作品がありません
                                    </p>
                                )}

                                {!isLoading && !hasError && hasMovies && (
                                    <div className={styles.movie_grid}>
                                        {movies.map((movie) => (
                                            <MovieCard
                                                key={movie.movie_id}
                                                title={movie.title}
                                                imageUrl={
                                                    movie.trailer_url ||
                                                    movie.poster_url ||
                                                    ""
                                                }
                                                onClick={() =>
                                                    handleMovieClick(
                                                        movie.movie_id
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGate>
    );
}
