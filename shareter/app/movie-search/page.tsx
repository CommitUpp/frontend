"use client";

import styles from "./page.module.css";
import Image from "next/image";


type Props = {
    onSelectMovie: () => void;
};

export default function MovieSearchPage({ onSelectMovie, }: Props) {

    const tags = [
        "ハリーポッター賢者の石",
        "アベンジャーズシビルウォー",
        "アイアンマン3",
    ];

    const movies = [
        {
            id: 1,
            title: "ハリー・ポッター",
            image: "/image/dami2.jpg",
        },
        {
            id: 2,
            title: "アベンジャーズ",
            image: "/image/dami2.jpg",
        },
        {
            id: 3,
            title: "アイアンマン3",
            image: "/image/dami2.jpg",
        },

        {
            id: 4,
            title: "アイアンマン3",
            image: "/image/dami2.jpg",
        },

        {
            id: 5,
            title: "アイアンマン3",
            image: "/image/dami2.jpg",
        },

        {
            id: 6,
            title: "アイアンマン3",
            image: "/image/dami2.jpg",
        },


    ];
    const movieRows = [
        {
            title: "今後人気",
            movies,
        },

    ];

    return (
        <div className={styles.search_wrap}>

            <div className={styles.sidebar_wrap}>
                <div className={styles.group_wrap}>
                    <Image
                        src="/image/dami1.png"
                        alt="グループアイコン"
                        width={36}
                        height={36}
                        className={styles.group_image}
                    />

                    <div className={styles.group_info} >
                        <p className={styles.group_label}>グループ名</p>
                        <h2 className={styles.group_name}>ECCメンツ</h2>
                    </div>
                </div>

                <section className={styles.channel_wrap}>
                    <div className={styles.channel_header}>
                        <Image src="/image/toggle.png" alt="トグル" width={16} height={16} />
                        <h1 className={styles.channel_title}>movieチャンネル</h1>
                    </div>
                    <div className={styles.tag_list}>
                        {tags.map((tag, index) => (
                            <p key={index} className={styles.tag_item}>
                                # {tag}
                            </p>
                        ))}
                    </div>
                </section>
                <button className={styles.add_button}>
                    ＋ チャンネルを追加する
                </button>
            </div>



            <div className={styles.main_container}>
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

                {movieRows.map((row, index) => (
                    <section key={index} className={styles.row_section}>
                        <div className={styles.row_header}>
                            <h3>{row.title}</h3>
                        </div>
                        <div className={styles.movies_container}>
                            {row.movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className={styles.movie_wrap}
                                    onClick={onSelectMovie}
                                >
                                    <Image
                                        src={movie.image}
                                        alt={movie.title}
                                        width={220}
                                        height={320}
                                        className={styles.movie_image}
                                    />

                                    <p className={styles.movie_name}>{movie.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

            </div>
        </div>

    );
}