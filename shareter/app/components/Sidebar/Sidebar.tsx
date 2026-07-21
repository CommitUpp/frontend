"use client";

import { useState } from "react";
import Image from "next/image";
import GroupCreateModal from "@/app/components/GroupCreateModal/GroupCreateModal";
import AddFriendsModal from "@/app/components/AddFriendsModal/AddFriendsModal";
import GroupNameModal from "@/app/components/GroupNameModal/GroupNameModal";
import styles from "./Sidebar.module.css";

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
};

type Friend = {
    id: number;
    name: string;
    image: string;
};

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
    const [isGroupNameOpen, setIsGroupNameOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

    const [groups, setGroups] = useState<Group[]>([
        {
            id: 1,
            name: "ECCメンツ",
            count: 12,
            image: "/image/dami1.png",
        },
    ]);

    return (
        <>
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
            )}
        </>
    );
}