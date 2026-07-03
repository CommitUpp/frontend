"use client";

import { useRouter } from "next/navigation";
import styles from "./SelectMovie.module.css";

export default function SelectMovie() {

    const router = useRouter();

    return (

        <div className={styles.select_movie_wrap}>

            <div className={styles.select_movie_box}>

                <h2 className={styles.select_movie_title}>
                    同時視聴する作品を
                    <br />
                    選んでください
                </h2>


                <button
                    className={styles.select_button}
                    onClick={() => router.push("/movie-search")}
                >

                    選択する

                    <span>
                        ▶
                    </span>

                </button>

            </div>

        </div>

    );
}