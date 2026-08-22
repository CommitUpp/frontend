"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MovieCard from "../components/MovieCard/MovieCard";
import { getFavoriteMovies, getMovieStatus } from "@/lib/api/users";
import { useGroup } from "@/contexts/GroupContext";
import type { Movie, MoviesResponse } from "@/types/movies";
import styles from "./page.module.css";

const tabs = ["お気に入り", "視聴済み", "誰かと見たい"];

function toMovies(response: MoviesResponse | Movie[]): Movie[] {
    return Array.isArray(response) ? response : response.movies;
}

export default function MyPageTabs() {
    const router = useRouter();
    const { selectedGroupId } = useGroup();
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMoviesByStatus = async (status: string) => {
        setIsLoading(true);

        try {
            const response = await getMovieStatus(status);
            const nextMovies = toMovies(response);

            console.log("[MyPageTabs] getMovieStatus response", {
                status,
                movies: nextMovies,
            });

            setMovieList(nextMovies);
        } catch (error) {
            console.error("[MyPageTabs] getMovieStatus failed", {
                status,
                error,
            });
            setMovieList([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFavoriteClick = () => {
        console.log("お気に入りタブがクリックされました");
        setActiveTab("お気に入り");
        fetchFavoriteMovies();
    };

    const fetchFavoriteMovies = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await getFavoriteMovies();
            const nextMovies = toMovies(response);

            console.log("[MyPageTabs] getFavoriteMovies response", {
                movies: nextMovies,
            });

            setMovieList(nextMovies);
        } catch (error) {
            console.error("[MyPageTabs] getFavoriteMovies failed", error);
            setMovieList([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavoriteMovies();
    }, [fetchFavoriteMovies]);

    const handleWatchedClick = () => {
        console.log("視聴済みタブがクリックされました");
        setActiveTab("視聴済み");
        fetchMoviesByStatus("watched");
    };

    const handleWantToWatchClick = () => {
        console.log("誰かと見たいタブがクリックされました");
        setActiveTab("誰かと見たい");
        fetchMoviesByStatus("wanna_watch");
    };

    const getTabClickHandler = (tab: string) => {
        if (tab === "お気に入り") return handleFavoriteClick;
        if (tab === "視聴済み") return handleWatchedClick;
        return handleWantToWatchClick;
    };

    const handleMovieClick = (movieId: string) => {
        if (!selectedGroupId) return;

        const params = new URLSearchParams({
            group_id: selectedGroupId,
        });

        router.push(`/movie/${movieId}?${params.toString()}`);
    };

    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    className={`${styles.tab} ${activeTab === tab ? styles.active_tab : ""}`}
                    onClick={getTabClickHandler(tab)}
                >
                    {tab}
                </button>
            ))}

            <div className={styles.movie_list}>
                {isLoading && (
                    <p className={styles.loading_text}>取得中...</p>
                )}

                {!isLoading && movieList.map((movie) => (
                    <MovieCard
                        key={`${activeTab}-${movie.movie_id}`}
                        title={movie.title}
                        imageUrl={movie.trailer_url || movie.poster_url || ""}
                        onClick={() => handleMovieClick(movie.movie_id)}
                    />
                ))}
            </div>
        </div>
    );
}
