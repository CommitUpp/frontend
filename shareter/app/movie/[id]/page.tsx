import Image from "next/image";
import { mockMoviesResponse } from "@/mock/movies";
import WatchTogetherButton from "./WatchTogetherButton";
import styles from "./page.module.css";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function MovieDetail({ params }: Props) {
    const { id } = await params;

    const movie = mockMoviesResponse.movies.find(
        (movie) => movie.movie_id === id
    );

    if (!movie) {
        return <p>作品が見つかりませんでした。</p>;
    }

    return (
        <main className={styles.container}>
            {/* ヘッダー画像 */}
            <div className={styles.hero}>
                <Image
                    src={movie.trailer_url}
                    alt={movie.title}
                    fill
                    className={styles.heroImage}
                />

                <button className={styles.backButton}>
                    ←
                </button>

                {/* 左側 */}
                <div className={styles.leftArea}>
                    <WatchTogetherButton movieId={movie.movie_id} />

                    <div className={styles.serviceList}>
                        <div className={styles.serviceItem}>
                            <Image src="/image/subscOne.png" alt="Spotify" width={48} height={48} />
                            <span className={styles.serviceName}>Spotify</span>
                        </div>
                        <div className={styles.serviceItem}>
                            <Image src="/image/subscTwo.png" alt="YouTube" width={48} height={48} />
                            <span className={styles.serviceName}>YouTube</span>
                        </div>
                        <div className={styles.serviceItem}>
                            <Image src="/image/subscThree.png" alt="Prime Video" width={48} height={48} />
                            <span className={styles.serviceName}>Prime</span>
                        </div>
                        <div className={styles.serviceItem}>
                            <Image src="/image/subscFour.png" alt="Netflix" width={48} height={48} />
                            <span className={styles.serviceName}>Netflix</span>
                        </div>
                    </div>
                </div>

                {/* 右側 */}
                <div className={styles.rightArea}>
                    <div className={styles.memberList}>
                        <div className={styles.memberAvatar}>
                            <Image src="/image/dami1.png" alt="視聴中のユーザー" width={52} height={52} />
                            <span className={styles.memberBadge}><Image src="/image/friend_shareIcon.png" alt="視聴したユーザー" width={80} height={85} /></span>
                        </div>
                        <div className={styles.memberAvatar}>
                            <Image src="/image/dami1.png" alt="視聴中のユーザー" width={52} height={52} />
                            <span className={styles.memberBadge}><Image src="/image/friend_shareIcon.png" alt="視聴したユーザー" width={80} height={85} /></span>
                        </div>
                        <div className={styles.memberAvatar}>
                            <Image src="/image/dami1.png" alt="視聴中のユーザー" width={52} height={52} />
                            <span className={styles.memberBadge}><Image src="/image/friend_shareIcon.png" alt="視聴したユーザー" width={80} height={85} /></span>
                        </div>
                    </div>

                    <div className={styles.actionList}>
                        <button className={styles.actionItem}>
                            <Image src="/image/share.png" alt="" width={28} height={28} />
                            <span className={styles.actionLabel}>共有</span>
                        </button>
                        <button className={styles.actionItem}>
                            <Image src="/image/watched.png" alt="" width={20} height={20} />
                            <span className={styles.actionLabel}>見た</span>
                        </button>
                        <button className={styles.actionItem}>
                            <Image src="/image/favorite.png" alt="" width={26} height={26} />
                            <span className={styles.actionLabel}>お気に入り</span>
                        </button>
                        <button className={styles.actionItem}>
                            <Image src="/image/someone.png" alt="" width={26} height={26} />
                            <span className={styles.actionLabel}>誰かと見る</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 詳細 */}
            <section className={styles.detail}>
                <h1>{movie.title}</h1>

                <h2>エピソード</h2>

                <p className={styles.story}>
                    あらすじは後ほどモックデータから取得予定
                </p>
            </section>
        </main>
    );
}