import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {

  const tags = [
    "ハリーポッター賢者の石",
    "アベンジャーズシビルウォー",
    "アイアンマン3",
  ];


  return (
    <>
      <div className={styles.page_wrap}>
        <div className={styles.sidebar_wrap}>
          <div className={styles.group_wrap}>
            <Image
              src="/image/dami1.png"
              alt="グループアイコン"
              width={36}
              height={36}
              className={styles.group_image}
            />

            <div className={styles.group_info}>
              <p className={styles.group_label}>グループ名</p>
              <h2 className={styles.group_name}>ECCメンツ</h2>
            </div>
          </div>

          <section className={styles.channel_wrap}>
            <h1 className={styles.channel_title}>⬇︎ movieチャンネル</h1>

            <div className={styles.tag_list}>
              {tags.map((tag, index) => (
                <p key={index} className={styles.tag_item}>
                  # {tag}
                </p>
              ))}
            </div>
          </section>
          <button className={styles.add_button}>
            ＋ チャンネルを追加する
          </button>
        </div>

        <div className={styles.main_wrap}>

          <div className={styles.live_wrap}>

          </div>

          <div className={styles.recommend_wrap}>
            <h3>
              今夜何を見る？
            </h3>

            <div className={styles.movies_container}>
              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>


            </div > {/* movie_container閉じタグ */}



            <h3>
              誰かに"グッ"と来た
            </h3>
            <div className={styles.movies_container}>
              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>

              <div className={styles.movie_wrap}>
                <Image
                  src="/image/dami2.jpg"
                  alt="映画サムネ"
                  width={250}
                  height={180}
                  className={styles.movie_image}
                />
                <div></div>
                <p className={styles.movie_name}>タイトル</p>
              </div>
            </div > {/* movie_container閉じタグ */}

          </div> {/* recommend_wrap閉じタグ */}

        </div> {/* main_wrap閉じタグ */}

      </div> {/* page_wrap閉じタグ */}

    </>
  );
}
