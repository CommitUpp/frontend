"use client";

import Link from "next/link";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import styles from "./page.module.css";

export default function plan() {
    return (
        <div className={styles.page_wrap}>
            <Sidebar />
            <div className={styles.container}>
                <h1 className={styles.title}>
                    プラン一覧
                </h1>

                <div className={styles.planWrap}>

                    {/* 無料 */}
                    <div className={styles.cardOuter}>

                        <div className={styles.card}>

                            <p className={styles.planName}>
                                トライアル
                            </p>

                            <div className={styles.priceArea}>
                                <span className={styles.price}>
                                    無料
                                </span>

                                <span className={styles.month}>
                                    /月
                                </span>
                            </div>

                            <button className={styles.button}>
                                続ける
                            </button>

                        </div>

                    </div>

                    {/* 有料 */}
                    <div className={styles.cardOuter}>

                        <div className={styles.cardBlur}></div>

                        <div className={styles.card}>

                            <p className={styles.planName}>
                                ベーシック
                            </p>

                            <div className={styles.priceArea}>
                                <span className={styles.price}>
                                    330円
                                </span>

                                <span className={styles.month}>
                                    /月
                                </span>
                            </div>

                            <ul className={styles.featureList}>
                                <li>同時視聴無制限</li>
                                <li>グループ作成無制限</li>
                                <li>チャンネル作成無制限</li>
                            </ul>

                            <button className={styles.button}>
                                <Link href="./">
                                    加入する
                                </Link>
                            </button>
                        </div>

                    </div>

                </div>

            </div >
        </div>
    );
}