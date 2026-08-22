"use client";

import Image from "next/image";
import AuthGate from "../components/AuthGate/AuthGate";
import { useAuth } from "@/contexts/AuthContext";
import MyPageTabs from "./MyPageTabs";
import styles from "./page.module.css";

export default function MyPage() {
    const { user } = useAuth();
    const userName = user?.user_metadata.name;
    const avatarUrl = user?.user_metadata.avatar_url;

    return (
        <AuthGate unauthenticatedPath="/landing-page">
            <main className={styles.container}>
                <div className={styles.account_wrap}>
                    {avatarUrl && (
                        <Image
                            src={avatarUrl}
                            alt={`${userName}のプロフィール画像`}
                            width={100}
                            height={100}
                            unoptimized
                        />
                    )}
                    <p>アカウント</p>
                    {userName && <p>{userName}</p>}
                </div>

                <div className={styles.movie_list_wrap}>
                    <h2 className={styles.movie_list_title}>MovieList</h2>

                    <MyPageTabs />
                </div>
            </main>
        </AuthGate>
    );
}
