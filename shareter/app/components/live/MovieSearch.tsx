"use client";

import styles from "./MovieSearch.module.css";
import Image from "next/image";


type Props = {
    onStartWatch: () => void;
};

export default function MovieSearch({
    onStartWatch
}: Props) {



    return (
        <div className={styles.search_wrap}>



            <div className={styles.main_container}>

                <button
                    className={styles.select_button}
                    onClick={onStartWatch}
                >
                    同時視聴を開始する
                    <span>
                        ▶
                    </span>

                </button>

                <div className={styles.mvsearch_wrap}>
                    <h2>
                        作品検索
                    </h2>

                    <input
                        type="text"
                        placeholder="見たい映画を検索してください"
                        className={styles.search_input}
                    />
                </div>
            </div>
        </div>

    );
}