"use client";

import styles from "./WatchReady.module.css";
import Image from "next/image";

type Props = {
    onStart: () => void;
};

export default function WatchReady({ onStart }: Props) {
    return (
        <div className={styles.select_movie_wrap}>

            <div className={styles.select_movie_box}>

                <h2 className={styles.select_movie_title}>
                    この作品を視聴しますか？
                </h2>


                <button
                    type="button"
                    className={styles.select_button}
                    onClick={onStart}
                >
                    同時視聴を開始する
                    <span>
                        ▶
                    </span>

                </button>

            </div>

        </div>
    );
}
