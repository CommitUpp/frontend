"use client";

import { Bookmark, Star, MessageSquareShare, ScanFace } from "lucide-react";
import styles from "./page.module.css";
import { postMovieStatus } from "@/lib/api/users";

type Props = {
    movieId: string;
};

export default function MovieActions({ movieId }: Props) {
    const handleShare = () => {
        console.log("共有ボタンがクリックされました", { movieId });
    };

    const handleWatched = () => {
        postMovieStatus(movieId, "watched")
    };

    const handleFavorite = () => {
        console.log("お気に入りボタンがクリックされました", { movieId });
    };

    const handleWatchWithSomeone = () => {
        postMovieStatus(movieId, "wanna_watch")
    };

    return (
        <div className={styles.actionList}>
            <button
                type="button"
                className={styles.actionItem}
                onClick={handleShare}
            >
                <MessageSquareShare size={28} aria-hidden="true" />
                <span className={styles.actionLabel}>共有</span>
            </button>

            <button
                type="button"
                className={styles.actionItem}
                onClick={handleWatched}
            >
                <Bookmark size={28} aria-hidden="true" />
                <span className={styles.actionLabel}>見た</span>
            </button>

            <button
                type="button"
                className={styles.actionItem}
                onClick={handleFavorite}
            >
                <Star size={28} aria-hidden="true" />
                <span className={styles.actionLabel}>お気に入り</span>
            </button>

            <button
                type="button"
                className={styles.actionItem}
                onClick={handleWatchWithSomeone}
            >
                <ScanFace size={28} aria-hidden="true" />
                <span className={styles.actionLabel}>誰かと見る</span>
            </button>
        </div>
    );
}
