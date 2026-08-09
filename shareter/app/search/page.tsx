"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "../components/AuthGate/AuthGate";
import MovieCard from "../components/MovieCard/MovieCard";
import Sidebar from "../components/Sidebar/Sidebar";
import { mockMoviesResponse } from "@/mock/movies";
import type { Movie } from "@/types/movies";
import styles from "./page.module.css";

const groupId = "4bb618e1-1fc2-457b-b635-bde0b1df667b";

function fetchMockMovies(query: string): Promise<Movie[]> {
    const normalizedQuery = query.trim().toLowerCase();

    return new Promise((resolve) => {
        window.setTimeout(() => {
            if (!normalizedQuery) {
                resolve(mockMoviesResponse.movies);
                return;
            }

            resolve(
                mockMoviesResponse.movies.filter((movie) => {
                    const title = movie.title.toLowerCase();
                    const genres = movie.genres?.join(" ").toLowerCase() ?? "";

                    return (
                        title.includes(normalizedQuery) ||
                        genres.includes(normalizedQuery)
                    );
                })
            );
        }, 350);
    });
}

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>(mockMoviesResponse.movies);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const timerId = window.setTimeout(async () => {
            const nextMovies = await fetchMockMovies(query);

            if (!isCancelled) {
                setMovies(nextMovies);
                setIsLoading(false);
            }
        }, 300);

        return () => {
            isCancelled = true;
            window.clearTimeout(timerId);
        };
    }, [query]);

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setQuery(event.target.value);
    };

    const handleMovieClick = (movieId: string) => {
        const params = new URLSearchParams({
            group_id: groupId,
        });

        router.push(`/movie/${movieId}?${params.toString()}`);
    };

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

                                {!isLoading && movies.length === 0 && (
                                    <p className={styles.empty_text}>
                                        該当する作品がありません
                                    </p>
                                )}

                                {!isLoading && movies.length > 0 && (
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
