import Link from "next/link";
import styles from "./PremiumGuide.module.css";




export default function PremiumGuide() {


    return (
        <>
            <div className={styles.movie_wrap}>

                <div className={styles.movie_box}>

                    <h2 className={styles.movie_title}>
                        今月の同時視聴を使い切りました。
                        <br />
                        <span>プランを変更してください</span>
                    </h2>


                    <button
                        className={styles.select_button}
                    >
                        <Link href="./plan">
                            加入する

                            <span>
                                ▶
                            </span>
                        </Link>
                    </button>

                </div>

            </div>
        </>
    );
}