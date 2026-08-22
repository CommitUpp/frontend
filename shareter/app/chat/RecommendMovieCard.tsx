import type { RecommendMovie } from "@/mock/recommend-movie";
import styles from "./RecommendMovieCard.module.css";

type Props = {
    movie: RecommendMovie;
};

export default function RecommendMovieCard({ movie }: Props) {
    return (
        <>
            <div className={styles.recommend_divider}>
                <span />

                <p>
                    {movie.user}が{movie.title}を
                    お勧めしました
                </p>

                <span />
            </div>

            <div className={styles.recommend_wrap}>
                <p className={styles.recommend_user}>
                    {movie.user}
                </p>

                <article className={styles.movie_card}>
                    <div className={styles.movie_image}>
                        <img
                            src={movie.imageUrl}
                            alt={movie.title}
                        />
                    </div>

                    <div className={styles.movie_information}>
                        <h2>{movie.title}</h2>

                        <p>
                            {movie.overview}
                        </p>

                        <button type="button">
                            同時視聴開始する
                            <span>▶</span>
                        </button>
                    </div>
                </article>
            </div>
        </>
    );
}
