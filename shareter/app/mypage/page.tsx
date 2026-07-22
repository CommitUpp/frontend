import Image from "next/image";
import MyPageTabs from "./MyPageTabs";
import styles from "./page.module.css";

export default function MyPage() {
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

                <MyPageTabs movies={movies} />
            </div>
        </main >
    );
}
