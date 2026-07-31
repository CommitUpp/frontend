"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getFavoriteMovies, getMovieStatus } from "@/lib/api/users";
import type { Movie, MoviesResponse } from "@/types/movies";
import styles from "./page.module.css";

const tabs = ["お気に入り", "視聴済み", "誰かと見たい"];

type Props = {
    movies: string[];
};

function toMovies(response: MoviesResponse | Movie[]): Movie[] {
    return Array.isArray(response) ? response : response.movies;
}

export default function MyPageTabs({ movies }: Props) {
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

    const visibleMovies = movieList.length > 0 ? movieList : movies.map((title, index) => ({
        movie_id: `mock-${index}`,
        overview: "",
        poster_url: "",
        release_date: "",
        title,
        tmdb_id: "",
        trailer_url: "",
        updated_at: "",
    }));

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

                {!isLoading && visibleMovies.map((movie) => (
                    <div className={styles.movie_card} key={`${activeTab}-${movie.movie_id}`}>
                        <div className={styles.thumbnail_wrap}>
                            <div className={styles.thumbnail}>
                                {(movie.poster_url ?? movie.trailer_url) && (
                                    <Image
                                        src={movie.trailer_url}
                                        alt={movie.title}
                                        fill
                                        sizes="232px"
                                        className={styles.thumbnail_image}
                                    />
                                )}
                            </div>
                            <div className={styles.icons}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M13.1954 13.361L13.1957 10.9498C13.1958 9.61787 11.9777 8.5381 10.4751 8.5381H3.22085C1.71846 8.5381 0.500475 9.61757 0.500306 10.9493L0.5 13.361M9.5685 2.91143C9.5685 4.24323 8.35047 5.32286 6.84795 5.32286C5.34543 5.32286 4.1274 4.24323 4.1274 2.91143C4.1274 1.57963 5.34543 0.5 6.84795 0.5C8.35047 0.5 9.5685 1.57963 9.5685 2.91143Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                                    <path d="M8.51553 11.7667H2.3865C1.34484 11.7667 0.50041 11.0044 0.50042 10.0641L0.500491 3.59144C0.500496 2.94312 0.500229 2.01968 0.5 1.35105C0.499839 0.880782 0.922112 0.5 1.44308 0.5H5.93683L8.10978 2.59528H14.6453C15.1661 2.59528 15.5883 2.9764 15.5883 3.44654V5.70777M13.7022 12.3717L13.7022 9.96391M13.7022 9.96391L13.7022 7.55616M13.7022 9.96391L11.0349 9.96391M13.7022 9.96391L16.3696 9.96391" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <p className={styles.title}>{movie.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
