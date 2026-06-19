"use client";

import GroupCreateModal from "./components/GroupCreateModal/GroupCreateModal";
import AddFriendsModal from "./components/AddFriendsModal/AddFriendsModal";
import GroupNameModal from "./components/GroupNameModal/GroupNameModal";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
  const [isGroupNameOpen, setIsGroupNameOpen] = useState(false);

  const tags = [
    "ハリーポッター賢者の石",
    "アベンジャーズシビルウォー",
    "アイアンマン3",
  ];

  type Group = {
    id: number;
    name: string;
    count: number;
    image: string;
  }

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "ECCメンツ",
      count: 12,
      image: "/image/dami1.png",
    },
  ]);

  const addGroup = (name: string, count: number) => {
    if (groups.length >= 3) {
      alert("グループは3つまでしか作成できません");
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: name,
      count: count,
      image: "/image/dami1.png",
    };

    setGroups([...groups, newGroup]);
  };

  type Friend = {
    id: number;
    name: string;
    image: string;
  };

  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

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

            <div className={styles.group_info} onClick={() => setIsOpen(true)}>
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


      {isOpen && (
        <GroupCreateModal
          groups={groups}
          onClose={() => setIsOpen(false)}
          onAddClick={() => {
            if (groups.length >= 3) {
              alert("グループは3つまでしか作成できません");
              return;
            }

            setIsOpen(false);
            setIsAddFriendsOpen(true);
          }}
        />
      )}


      {isAddFriendsOpen && (
        <AddFriendsModal
          onClose={() => setIsAddFriendsOpen(false)}
          onNextClick={(friends) => {
            setSelectedFriends(friends);
            setIsAddFriendsOpen(false);
            setIsGroupNameOpen(true);
          }}
        />
      )}

      {isGroupNameOpen && (
        <GroupNameModal
          selectedFriends={selectedFriends}
          onClose={() => setIsGroupNameOpen(false)}
          onCreateGroup={(name, image) => {
            setGroups([
              ...groups,
              {
                id: Date.now(),
                name,
                count: selectedFriends.length,
                image,
              },
            ]);

            setIsGroupNameOpen(false);
            setIsOpen(true);
          }}
        />
      )}    </>
  );
}
