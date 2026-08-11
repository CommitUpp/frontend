"use client";

import { useState } from "react";
import Image from "next/image";
import GroupCreateModal from "@/app/components/GroupCreateModal/GroupCreateModal";
import AddFriendsModal from "@/app/components/AddFriendsModal/AddFriendsModal";
import GroupNameModal from "@/app/components/GroupNameModal/GroupNameModal";
import styles from "./Sidebar.module.css";

const channels = [
    {
        id: "harry-potter",
        name: "ハリーポッター賢者の石",
    },
    {
        id: "avengers-civil-war",
        name: "アベンジャーズシビルウォー",
    },
    {
        id: "ironman-3",
        name: "アイアンマン3",
    },
];

type Props = {
    selectedChannelId?: string;
    onSelectChannel?: (channelId: string) => void;
};

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

export default function Sidebar({
    selectedChannelId,
    onSelectChannel,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
    const [isGroupNameOpen, setIsGroupNameOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
    const [fallbackSelectedChannelId, setFallbackSelectedChannelId] =
        useState(channels[0].id);
    const activeChannelId = selectedChannelId ?? fallbackSelectedChannelId;
    const handleSelectChannel = onSelectChannel ?? setFallbackSelectedChannelId;

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
                <button
                    type="button"
                    className={styles.group_wrap}
                    onClick={() => setIsOpen(true)}
                >
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
                </button>

                <section className={styles.channel_wrap}>
                    <div className={styles.channel_header}>
                        <Image
                            src="/image/toggle.png"
                            alt="トグル"
                            width={16}
                            height={16}
                        />

                        <h1 className={styles.channel_title}>
                            movieチャンネル
                        </h1>
                    </div>

                    <div className={styles.tag_list}>
                        {channels.map((channel) => {
                            const isActive =
                                activeChannelId === channel.id;

                            return (
                                <button
                                    key={channel.id}
                                    type="button"
                                    className={`${styles.tag_item} ${isActive ? styles.active : ""
                                        }`}
                                    onClick={() =>
                                        handleSelectChannel(channel.id)
                                    }
                                >
                                    # {channel.name}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <button type="button" className={styles.add_button}>
                    ＋ チャンネルを追加する
                </button>
            </div>

            {isOpen && (
                <GroupCreateModal
                    groups={groups}
                    onClose={() => setIsOpen(false)}
                    onAddClick={() => {
                        if (groups.length >= 3) {
                            alert(
                                "グループは3つまでしか作成できません"
                            );
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
                        setGroups((prevGroups) => [
                            ...prevGroups,
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
