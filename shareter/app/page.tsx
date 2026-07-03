"use client";

import LiveArea from "./components/live/LiveArea";
import GroupCreateModal from "./components/GroupCreateModal/GroupCreateModal";
import AddFriendsModal from "./components/AddFriendsModal/AddFriendsModal";
import GroupNameModal from "./components/GroupNameModal/GroupNameModal";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

type Props = {
  onSelectMovie: () => void;
};

export default function Home({ onSelectMovie, }: Props) {


  const [isOpen, setIsOpen] = useState(false);
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
  const [isGroupNameOpen, setIsGroupNameOpen] = useState(false);

  const tags = [
    "ハリーポッター賢者の石",
    "アベンジャーズシビルウォー",
    "アイアンマン3",
  ];

  const movies = [
    {
      id: 1,
      title: "ハリー・ポッター",
      image: "/image/dami2.jpg",
    },
    {
      id: 2,
      title: "アベンジャーズ",
      image: "/image/dami2.jpg",
    },
    {
      id: 3,
      title: "アイアンマン3",
      image: "/image/dami2.jpg",
    },

    {
      id: 4,
      title: "アイアンマン3",
      image: "/image/dami2.jpg",
    },

    {
      id: 5,
      title: "アイアンマン3",
      image: "/image/dami2.jpg",
    },

    {
      id: 6,
      title: "アイアンマン3",
      image: "/image/dami2.jpg",
    },

    {
      id: 7,
      title: "アイアンマン3",
      image: "/image/dami2.jpg",
    },

    {
      id: 8,
      title: "アイアンマン3",
      image: "/image/dami2.jpg",
    },
  ];

  const movieRows = [
    {
      title: "今夜何を見る？",
      movies,
    },
    {
      title: "アクション映画",
      movies,
    },
    {
      title: "感動する映画",
      movies,
    },
    {
      title: "アニメ映画",
      movies,
    },
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
      alert("グループは3つまでしか作成できません。有料プランに変更してください");
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

  // 後にAPIに差し替える
  const mockUser = {
    id: "u1",
    name: "テストユーザー",
    initials: "テ",
    avatarUrl: undefined,
  };

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
            <div className={styles.channel_header}>
              <Image src="/image/toggle.png" alt="トグル" width={16} height={16} />
              <h1 className={styles.channel_title}>movieチャンネル</h1>
            </div>

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

            <LiveArea
              currentUser={mockUser}
              remainingWatchCount={1}
              isPremium={false}
            />

          </div>

          <div className={styles.recommend_wrap}>

            {movieRows.map((row, index) => (
              <section key={index} className={styles.row_section}>
                <div className={styles.row_header}>
                  <h3>{row.title}</h3>
                </div>

                <div className={styles.movies_container}>
                  {row.movies.map((movie) => (
                    <div
                      key={movie.id}
                      className={styles.movie_wrap}
                      onClick={onSelectMovie}
                    >
                      <Image
                        src={"/image/dami2.jpg"}
                        alt={movie.title}
                        width={220}
                        height={320}
                        className={styles.movie_image}
                      />

                      <p className={styles.movie_name}>{movie.title}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
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
