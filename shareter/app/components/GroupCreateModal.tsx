import Link from "next/link";
import Image from "next/image";
import styles from "./GroupCreateModal.module.css";

export default function GroupCreateModal() {
    return (
        <>
            <div className={styles.modal_wrap}>
                <div className={styles.title_wrap}>
                    <button className={styles.back_button}>
                        <Image src="/image/arrow.png" alt="矢印" width={16} height={16} />
                    </button>
                    <h1 className={styles.title}>グループ一覧</h1 >
                </div>

                <div className={styles.group_wrap}>
                    {/* それぞれのグループ名、人数を反映させる */}
                    <div className={styles.group_card}>
                        <Image src="/image/ECCments_icon.png" alt="オレンジパーカの男性" width={52} height={52} />
                        <div className={styles.text}>
                            <p>ECCメンツ</p>
                            {/* ここはグループに参加してる人数を反映させる */}
                            <p>(12)</p>
                        </div>
                    </div>

                    <div className={styles.group_card}>
                        <Image src="/image/high_school_icon.png" alt="男女３人での会話" width={52} height={52} />
                        <div className={styles.text}>
                            <p>高校メンツ</p>
                            {/* ここはグループに参加してる人数を反映させる */}
                            <p>(6)</p>
                        </div>
                    </div>

                    <div className={styles.group_card}>
                        <Image src="/image/local_members_icon.png" alt="バイクの写真" width={52} height={52} />
                        <div className={styles.text}>
                            <p>地元メンバー</p>
                            {/* ここはグループに参加してる人数を反映させる */}
                            <p>(16)</p>
                        </div>
                    </div>
                </div>

                {/* このプラスボタンを押したら次のページへ行く処理を書く */}
                <button className={styles.add_button} aria-label="追加"></button>
            </div>
        </>
    );
}