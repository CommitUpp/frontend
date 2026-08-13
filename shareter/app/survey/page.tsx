import styles from "./page.module.css";

export default function SurveyPage() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>アンケートにお答えください</h1>
            <p className={styles.description}>
                お答えいただくとチャットが１つ解放されます
            </p>
        </main>
    );
}
