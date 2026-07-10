import Image from "next/image";
import styles from "./page.module.css";

export default function MyPage() {
    const tabs = ["お気に入り", "視聴済み", "誰かと見たい"];
    const movies = ["タイトル", "タイトル", "タイトル"];

    return (
        <main className={styles.container}>
            <div className={styles.account_wrap}>
                <Image
                    src="/image/young_woman.png"
                    alt="プロフィール画像"
                    width={100}
                    height={100}
                />
                <p>アカウント名</p>
                <p>ユーザーネーム</p>
            </div>

            <div className={styles.movie_list_wrap}>
                <h2 className={styles.movie_list_title}>MovieList</h2>

                <div className={styles.tabs}>
                    {tabs.map((tab, index) => (
                        // detailsはsummaryはセットで使う！（detailsが親でsummaryが子）
                        <details key={tab} name="requirements">
                            <summary className={styles.tab}>{tab}</summary>
                            <div className={styles.movie_list}>
                                {movies.map((title, index) => (
                                    <div className={styles.movie_card} key={index}>
                                        <div className={styles.thumbnail_wrap}>
                                            <div className={styles.thumbnail}></div>
                                            <div className={styles.icons}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <path d="M13.1954 13.361L13.1957 10.9498C13.1958 9.61787 11.9777 8.5381 10.4751 8.5381H3.22085C1.71846 8.5381 0.500475 9.61757 0.500306 10.9493L0.5 13.361M9.5685 2.91143C9.5685 4.24323 8.35047 5.32286 6.84795 5.32286C5.34543 5.32286 4.1274 4.24323 4.1274 2.91143C4.1274 1.57963 5.34543 0.5 6.84795 0.5C8.35047 0.5 9.5685 1.57963 9.5685 2.91143Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                                                    <path d="M8.51553 11.7667H2.3865C1.34484 11.7667 0.50041 11.0044 0.50042 10.0641L0.500491 3.59144C0.500496 2.94312 0.500229 2.01968 0.5 1.35105C0.499839 0.880782 0.922112 0.5 1.44308 0.5H5.93683L8.10978 2.59528H14.6453C15.1661 2.59528 15.5883 2.9764 15.5883 3.44654V5.70777M13.7022 12.3717L13.7022 9.96391M13.7022 9.96391L13.7022 7.55616M13.7022 9.96391L11.0349 9.96391M13.7022 9.96391L16.3696 9.96391" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>

                                            <p className={styles.title}>{title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </details>
                    ))}
                </div>

            </div>
        </main >
    );
}