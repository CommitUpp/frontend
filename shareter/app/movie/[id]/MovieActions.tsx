"use client";

import Image from "next/image";
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
                <Image src="/image/share.png" alt="" width={28} height={28} />
                <span className={styles.actionLabel}>共有</span>
            </button>

            <button
                type="button"
                className={styles.actionItem}
                onClick={handleWatched}
            >
                <Image src="/image/watched.png" alt="" width={20} height={20} />
                <span className={styles.actionLabel}>見た</span>
            </button>

            <button
                type="button"
                className={styles.actionItem}
                onClick={handleFavorite}
            >
                <Image src="/image/favorite.png" alt="" width={26} height={26} />
                <span className={styles.actionLabel}>お気に入り</span>
            </button>

            <button
                type="button"
                className={styles.actionItem}
                onClick={handleWatchWithSomeone}
            >
                <Image src="/image/someone.png" alt="" width={26} height={26} />
                <span className={styles.actionLabel}>誰かと見る</span>
            </button>
        </div>
    );
}
