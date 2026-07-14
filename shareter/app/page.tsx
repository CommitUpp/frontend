"use client";

import LiveArea from "./components/live/LiveArea";
import GroupCreateModal from "./components/GroupCreateModal/GroupCreateModal";
import AddFriendsModal from "./components/AddFriendsModal/AddFriendsModal";
import GroupNameModal from "./components/GroupNameModal/GroupNameModal";
import { useMemo, useState } from "react";
import { mockGroupMoviesResponse } from "@/mock/group-movies";
import { mockMoviesResponse } from "@/mock/movies";
import { movieRows } from "@/constants/movieRows";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

type Props = {
  onSelectMovie: () => void;
};

export default function Home({ onSelectMovie, }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
  const [isGroupNameOpen, setIsGroupNameOpen] = useState(false);
  const groupMovies = mockGroupMoviesResponse.movies;
  const movies = mockMoviesResponse.movies;
  const router = useRouter();

  // ジャンルごとの映画リストを作成
  const rows = useMemo(() => {
    return movieRows
      .map((row) => ({
        title: row.displayName,
        movies: movies.filter((movie) => movie.genres.includes(row.genre)),
      }))
      .filter((row) => row.movies.length > 0);
  }, [movies]);

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
            {/* グループの誰かが視聴済み */}
            <section className={styles.row_section}>
              <div className={styles.row_header}>
                <h3>今夜何見る？</h3>
              </div>

              <div className={styles.movies_container}>
                {groupMovies.map((movie) => (
                  <div
                    key={movie.movie_id}
                    className={styles.movie_wrap}
                    onClick={() => router.push(`/movie/${movie.movie_id}`)}
                  >
                    <Image
                      src={movie.trailer_url}
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

            {/* ジャンル別 */}
            {rows.map((row, index) => (
              <section key={index} className={styles.row_section}>
                <div className={styles.row_header}>
                  <h3>{row.title}</h3>
                </div>

                <div className={styles.movies_container}>
                  {row.movies.map((movie) => (
                    <div
                      key={movie.movie_id}
                      className={styles.movie_wrap}
                      onClick={onSelectMovie}
                    >
                      <Image
                        src={movie.trailer_url}
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
