"use client";

import styles from "./SelectMovie.module.css";
import { useWatchTogether } from "@/contexts/WatchTogetherContext";


type Props = {
    onSearch: () => void;
};

export default function SelectMovie({ onSearch }: Props) {

    const { startSelecting } = useWatchTogether();

    const handleSelect = () => {
        startSelecting();
        onSearch();
    };

    return (
        <div className={styles.select_movie_wrap}>
            <div className={styles.select_movie_box}>
                <h2 className={styles.select_movie_title}>
                    同時視聴する作品を<br />
                    選んでください
                </h2>
                <button
                    type="button"
                    className={styles.select_button}
                    onClick={handleSelect}>
                    選択する
                    <span>▶</span>
                </button>
            </div>
        </div>
    );
}
