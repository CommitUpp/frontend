"use client";
import styles from "./page.module.css";
import { supabase } from "../../lib/supabase"

export default function LoginPage() {

    const loginHandler = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000",
            },
        });

        console.log(data);
        console.log(error);
    };

    return (
        <main className={styles.login_page}>
            <div className={styles.login_wrap}>
                <h1 className={styles.title}>ShareTer</h1>

                <form className={styles.login_form}>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        autoComplete="email"
                    />

                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                    />

                    <div className={styles.google_login}>
                        <span className={styles.checkbox_text}>
                            Googleでログイン
                        </span>
                    </div>
                    <button
                        type="button"
                        className={styles.login_button}
                        onClick={loginHandler}
                    >
                        ログイン
                    </button>
                </form>
            </div>
        </main>
    );
}