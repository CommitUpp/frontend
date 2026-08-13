import { surveyQuestions } from "@/mock/survey";
import styles from "./page.module.css";

export default function SurveyPage() {
    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>アンケートにお答えください</h1>
                    <p className={styles.description}>
                        お答えいただくとチャットが1つ解放されます
                    </p>
                </div>

                <form className={styles.form}>
                    {surveyQuestions.map((question) => (
                        <section key={question.id} className={styles.question}>
                            <h2 className={styles.questionTitle}>
                                {question.label}
                            </h2>

                            <div className={styles.optionList}>
                                {question.options.map((option) => (
                                    <label key={option.id} className={styles.option}>
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option.id}
                                            className={styles.radio}
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    ))}

                    <button type="submit" className={styles.submitButton}>
                        回答する
                    </button>
                </form>
            </div>
        </main>
    );
}
