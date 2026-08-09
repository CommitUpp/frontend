"use client";

import AuthGate from "../components/AuthGate/AuthGate";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./page.module.css";

export default function SearchPage() {
    return (
        <AuthGate unauthenticatedPath="/landing-page">
            <div className={styles.page_wrap}>
                <Sidebar />

                <div className={styles.main_wrap}>
                    <div className={styles.search_wrap}>
                        <div className={styles.main_container}>
                            <div className={styles.mvsearch_wrap}>
                                <h2>作品検索</h2>

                                <input
                                    type="text"
                                    placeholder="見たい映画を検索してください"
                                    className={styles.search_input}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGate>
    );
}
