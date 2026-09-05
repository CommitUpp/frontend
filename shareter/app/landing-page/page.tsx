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


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = id === "how_to_use" ? 100 : 0;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };



  return (
    <AuthGate authenticatedPath="/home">
      <main className={styles.page}>

        {/* ファーストビュー */}
        <section className={styles.main_view}>

          <div className={styles.main_visual}></div>

          <header className={styles.header}>
            <img
              src="/image/logo.png"
              alt="Sheater"
              className={styles.logo}
            />
          </header>

          <nav className={styles.navigation}>
            <button
              type="button"
              className={styles.navigation_link}
              onClick={() => scrollToSection("about")}
            >
              ABOUT
            </button>

            <button
              type="button"
              className={styles.navigation_link}
              onClick={() => scrollToSection("how_to_use")}
            >
              HOW TO USE
            </button>

            <button
              type="button"
              className={styles.login_link}
              onClick={() => scrollToSection("login")}
            >
              LOGIN
            </button>
          </nav>

          <div className={styles.hero}>
            <h1 className={styles.title}>
              「見たい」がつながる、
              <br />
              映画の新体験
            </h1>

            <p className={styles.description}>
              友達と「見たい」「見た」を共有して、映画をもっと身近に。
            </p>

            <button
              type="button"
              className={styles.gsi_material_button}
              onClick={loginHandler}
            >
              <div className={styles.gsi_material_button_state}></div>

              <div className={styles.gsi_material_button_content_wrapper}>
                <div className={styles.gsi_material_button_icon}>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>

                <span className={styles.gsi_material_button_contents}>
                  Sign in with Google
                </span>
              </div>
            </button>
          </div>
        </section>


        {/* BEFORE SHEATER  */}
        <section className={styles.before_sheater_section}>
          <div className={styles.before_sheater_image}>
            <img
              src="/image/before_sheater.jpg"
              alt="Before Sheater"
            />
          </div>

          <div className={styles.before_sheater_content}>
            <h2 className={styles.before_sheater_heading}>
              BEFORE SHEATER
            </h2>

            <p className={styles.before_sheater_question}>
              こんな風に思ったことはありませんか？
            </p>

            <div className={styles.before_sheater_problems}>
              <p>
                「サブスクに加入しているが、見たい映画が見つからなくて使用できない」
              </p>

              <p>
                「映画を見たけど周りに見る人がいなくて語りたいけど語れなくてむずむずする」
              </p>
            </div>
          </div>
        </section>


        {/* ABOUT */}
        <section
          id="about"
          className={styles.about_section}
        >
          <div className={styles.about_content}>
            <p className={styles.about_label}>ABOUT</p>

            <h2 className={styles.about_title}>Sheater</h2>

            <h3 className={styles.about_heading}>
              友人の「見た」が、次に見る映画を見つけるきっかけに。
            </h3>

            <p className={styles.about_description}>
              友人が見ている映画やおすすめ作品を共有することで、
              <br />
              膨大な選択肢の中から「何を見るか迷う時間」を減らします。
              <br />
              作品ごとのチャットでは、ネタバレを気にせず感想を共有。
              <br />
              映画をただ「消費する」のではなく、友達と一緒に楽しむ「体験」へ。
            </p>

            <button
              type="button"
              className={`${styles.gsi_material_button} ${styles.about_button}`}
              onClick={loginHandler}
            >
              <div className={styles.gsi_material_button_state}></div>

              <div className={styles.gsi_material_button_content_wrapper}>
                <div className={styles.gsi_material_button_icon}>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>

                <span className={styles.gsi_material_button_contents}>
                  Sign in with Google
                </span>
              </div>
            </button>
          </div>

          <div className={styles.about_image}>
            <img src="/image/LP_mainView.jpg" alt="Sheater" />
          </div>
        </section>


        {/* HOW TO USE */}
        <section
          id="how_to_use"
          className={styles.how_to_use_section}
        >
          <h2 className={styles.how_to_use_heading}>
            HOW TO USE
          </h2>

          <div className={styles.how_to_use_list}>
            <div className={styles.how_to_use_row}>
              <div className={styles.how_to_use_image}>
                <img
                  src="/image/howtouse_watch.png"
                  alt="チャット画面"
                />
              </div>

              <div className={styles.how_to_use_text}>
                <h3 className={styles.how_to_use_subheading}>
                  同時視聴
                </h3>

                <p className={styles.how_to_use_description}>
                  同じ映画を、同じ瞬間に。
                  <br />
                  驚きも、感動も、笑いもリアルタイムで共有。
                  <br />
                  言葉やリアクションを交わしながら、離れていても一緒に映画を楽しめます。
                </p>
              </div>
            </div>

            <div
              className={`${styles.how_to_use_row} ${styles.how_to_use_row_reverse}`}
            >
              <div className={styles.how_to_use_image}>
                <img
                  src="/image/howtouse_serch.png"
                  alt="作品検索画面"
                />
              </div>

              <div className={styles.how_to_use_text}>
                <h3 className={styles.how_to_use_subheading}>
                  作品選択
                </h3>

                <p className={styles.how_to_use_description}>
                  一人の「見たい」が、みんなの「見たい」に。
                  <br />
                  友人が見たい作品や、すでに見た作品を確認しながら、次に見る映画を一緒に見つけられます。
                </p>
              </div>
            </div>

            <div className={styles.how_to_use_row}>
              <div className={styles.how_to_use_image}>
                <img
                  src="/image/howtouse_chat.png"
                  alt="作品ごとのチャット画面"
                />
              </div>

              <div className={styles.how_to_use_text}>
                <h3 className={styles.how_to_use_subheading}>
                  作品ごとのチャット
                </h3>

                <p className={styles.how_to_use_description}>
                  見終わったあとも、映画の余韻をみんなで。
                  <br />
                  作品ごとのチャットで、感想や「ここが好きだった」を自由に共有。
                  <br />
                  次に見たい作品も話しながら、映画の楽しみをつなげられます。
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>


      {/* FOOTER / LOGIN */}
      <footer
        id="login"
        className={styles.footer}
      >
        <p className={styles.footer_text}>
          友人と映画を観る準備をはじめませんか？
        </p>

        <button
          type="button"
          className={`${styles.gsi_material_button} ${styles.footer_button}`}
          onClick={loginHandler}
        >
          <div className={styles.gsi_material_button_state}></div>

          <div className={styles.gsi_material_button_content_wrapper}>
            <div className={styles.gsi_material_button_icon}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            </div>

            <span className={styles.gsi_material_button_contents}>
              Sign in with Google
            </span>
          </div>
        </button>
      </footer>
    </AuthGate>
  );
}
