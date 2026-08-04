"use client";

import { useEffect, useRef, useState } from "react";
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
    onClick: () => void;
};

export default function MovieCard({ title, imageUrl, watchers = [], onClick }: Props) {
    // 映画タイトルがカードの幅を超える場合に省略表示するための状態管理
    const titleRef = useRef<HTMLParagraphElement>(null);
    const titleTextRef = useRef<HTMLSpanElement>(null);
    const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);

    useEffect(() => {
        const titleElement = titleRef.current;
        const titleTextElement = titleTextRef.current;

        if (!titleElement || !titleTextElement) {
            return;
        }

        const updateOverflow = () => {
            setIsTitleOverflowing(titleTextElement.scrollWidth > titleElement.clientWidth);
        };

        updateOverflow();

        const resizeObserver = new ResizeObserver(updateOverflow);
        resizeObserver.observe(titleElement);
        resizeObserver.observe(titleTextElement);

        return () => resizeObserver.disconnect();
    }, [title]);

    return (
        <button type="button" className={styles.movie_card} onClick={onClick}>
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

            <p
                ref={titleRef}
                className={`${styles.movie_name} ${isTitleOverflowing ? styles.overflowing : ""}`}
            >
                <span ref={titleTextRef} className={styles.movie_name_text}>{title}</span>
            </p>
        </button>
    );
}
