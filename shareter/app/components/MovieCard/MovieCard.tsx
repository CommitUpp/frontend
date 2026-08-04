"use client";

import Image from "next/image";
import styles from "./MovieCard.module.css";

type Watcher = {
    avatar_url: string;
    user_id: string;
};

type Props = {
    title: string;
    imageUrl: string;
    watchers?: Watcher[];
    onClick?: () => void;
};

export default function MovieCard({ title, imageUrl, watchers = [], onClick }: Props) {
    const className = `${styles.movie_card} ${onClick ? styles.clickable : ""}`;
    const content = (
        <>
            <div className={styles.poster_wrap}>
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={250}
                        height={180}
                        className={styles.movie_image}
                    />
                )}

                {watchers.length > 0 && (
                    <div className={styles.watcher_icons}>
                        {watchers.slice(0, 3).map((watcher) => (
                            <Image
                                key={watcher.user_id}
                                src={watcher.avatar_url}
                                alt=""
                                width={32}
                                height={32}
                                className={styles.watcher_icon}
                            />
                        ))}
                    </div>
                )}
            </div>

            <p className={styles.movie_name}>{title}</p>
        </>
    );

    if (onClick) {
        return (
            <button type="button" className={className} onClick={onClick}>
                {content}
            </button>
        );
    }

    return (
        <div className={className}>
            {content}
        </div>
    );
}
