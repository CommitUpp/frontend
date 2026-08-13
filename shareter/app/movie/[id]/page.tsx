"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { Bookmark } from "lucide-react";
import useSWR from "swr";
import Loading from "@/app/components/Loading/Loading";
import { getMovieDetails } from "@/lib/api/movies";
import MovieActions from "./MovieActions";
import WatchTogetherButton from "./WatchTogetherButton";
import styles from "./page.module.css";

type WatchedUser = {
    UserID: string;
    UserName: string;
    AvatarURL: string;
};

type MovieDetailResponse = {
    MovieID: string;
    TMDBID: string;
    Title: string;
    PosterURL: string;
    TrailerURL: string;
    Overview: string;
    ReleaseDate: string;
    WatchedUser?: WatchedUser[];
    StreamingServices?: string[];
};

export default function MovieDetailPage() {
    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const movieId = params.id;
    const groupId = searchParams.get("group_id");
    const movieDetailKey: ["movieDetail", string, string] | null = groupId
        ? ["movieDetail", movieId, groupId]
        : null;

    const { data: movie, error, isLoading } = useSWR<MovieDetailResponse>(
        movieDetailKey,
        ([, currentMovieId, currentGroupId]: ["movieDetail", string, string]) => (
            getMovieDetails(currentMovieId, currentGroupId)
        ),
        {
            onError: (fetchError) => {
                console.error("[MovieDetail] getMovieDetails failed", fetchError);
            },
        }
    );

    if (!groupId) {
        return <p>グループIDが指定されていません。</p>;
    }

    if (isLoading) {
        return (
            <main className={styles.container}>
                <div className={styles.loadingWrap}>
                    <Loading label="作品情報を取得中..." />
                </div>
            </main>
        );
    }

    if (error || !movie) {
        return <p>作品情報の取得に失敗しました。</p>;
    }

    const streamingServices = movie.StreamingServices ?? [];
    const watchedUsers = movie.WatchedUser ?? [];

    return (
        <main className={styles.container}>
            <div className={styles.hero}>
                <Image
                    src={movie.TrailerURL}
                    alt={movie.Title}
                    fill
                    sizes="100vw"
                    className={styles.heroImage}
                    priority
                />

                <button
                    type="button"
                    className={styles.backButton}
                    aria-label="前の画面に戻る"
                    onClick={() => window.history.back()}
                >
                    ←
                </button>

                <div className={styles.leftArea}>
                    <WatchTogetherButton movieId={movie.MovieID} />

                    <div className={styles.serviceList}>
                        {streamingServices.map((service) => (
                            <div
                                key={service}
                                className={styles.serviceItem}
                            >
                                <Image
                                    src={getStreamingServiceImage(service)}
                                    alt={service}
                                    width={48}
                                    height={48}
                                />

                                <span className={styles.serviceName}>
                                    {service}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.rightArea}>
                    <div className={styles.memberList}>
                        {watchedUsers.map((user) => (
                            <div
                                key={user.UserID}
                                className={styles.memberAvatar}
                            >
                                <Image
                                    src={user.AvatarURL || "/image/dummy-icon-man.png"}
                                    alt={user.UserName}
                                    width={52}
                                    height={52}
                                />

                                <span className={styles.memberBadge}>
                                    <Bookmark size={18} fill="#181818" aria-label="視聴したユーザー" />
                                </span>
                            </div>
                        ))}
                    </div>

                    <MovieActions movieId={movie.MovieID} />
                </div>
            </div>

            <section className={styles.detail}>
                <h1>{movie.Title}</h1>

                <p>{movie.ReleaseDate}</p>

                <h2>あらすじ</h2>

                <p className={styles.story}>
                    {movie.Overview}
                </p>
            </section>
        </main>
    );
}

function getStreamingServiceImage(serviceName: string): string {
    const serviceImages: Record<string, string> = {
        Netflix: "/image/subsc-four.png",
        "U-NEXT": "/image/subsc-one.png",
        "Prime Video": "/image/subsc-three.png",
        YouTube: "/image/subsc-two.png",
    };

    return serviceImages[serviceName] ?? "/image/no-image.png";
}
