"use client";

import { supabase } from "@/lib/supabase";
import AuthGate from "../components/AuthGate/AuthGate";
import styles from "./page.module.css";

export default function LandingPage() {
  const loginHandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) {
      console.error("Googleログインに失敗しました:", error.message);
    }
  };

  return (
    <AuthGate authenticatedPath="/home">
      <main className={styles.page}>
        <div className={styles.content}>
          <h1 className={styles.title}>Sheater</h1>
          <button className={styles.login_button} onClick={loginHandler}>
          Googleでログイン
          </button>
        </div>
      </main>
    </AuthGate>
  );
}
