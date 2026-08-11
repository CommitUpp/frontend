"use client";

import { useRouter } from "next/navigation";
import { useWatchTogether } from "@/contexts/WatchTogetherContext";
import styles from "./page.module.css";

type Props = {
    movieId: string;
};

export default function WatchTogetherButton({ movieId }: Props) {
    const { isSelectingMovie } = useWatchTogether();
    const router = useRouter();

    const handleClick = () => {
        if (!isSelectingMovie) return;
        router.push(`/room/${movieId}`);
    };

    return (
        <button
            type="button"
            className={styles.watchButton}
            onClick={handleClick}
            disabled={!isSelectingMovie}
        >
            同時視聴開始する ▶
        </button>
    );
}
