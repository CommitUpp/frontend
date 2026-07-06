"use client";

import styles from "./SelectMovie.module.css";


type Props = {
    onSearch: () => void;
};

export default function SelectMovie({ onSearch }: Props) {


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
                    onClick={onSearch}

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