"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import GroupCreateModal from "@/app/components/GroupCreateModal/GroupCreateModal";
import GroupNameModal from "@/app/components/GroupNameModal/GroupNameModal";
import GroupSettingsModal from "@/app/components/GroupSettingsModal/GroupSettingsModal";
import { useGroupChatRooms } from "@/hooks/useGroupChatRooms";
import styles from "./Sidebar.module.css";

const groupId = "4bb618e1-1fc2-457b-b635-bde0b1df667b";

type Props = {
    selectedChannelId?: string;
    onSelectChannel?: (channelId: string) => void;
};

type Group = {
    id: string;
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
    const router = useRouter();
    const { data: chatRoomsResponse } = useGroupChatRooms(groupId);
    const channels = chatRoomsResponse?.chat_rooms ?? [];
    const [isOpen, setIsOpen] = useState(false);
    const [isGroupNameOpen, setIsGroupNameOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
    const [fallbackSelectedChannelId, setFallbackSelectedChannelId] =
        useState<string | undefined>();
    const activeChannelId = selectedChannelId ?? fallbackSelectedChannelId;

    const handleSelectChannel = (chatRoomId: string) => {
        if (onSelectChannel) {
            onSelectChannel(chatRoomId);
        } else {
            setFallbackSelectedChannelId(chatRoomId);
        }

        const params = new URLSearchParams({
            chat_room_id: chatRoomId,
        });

        router.push(`/chat?${params.toString()}`);
    };

    const [groups, setGroups] = useState<Group[]>([
        {
            id: groupId,
            name: "ECCメンツ",
            count: 12,
            image: "/image/dummy-icon-man.png",
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
                        src="/image/dummy-icon-man.png"
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
                        <ChevronDown size={32} aria-hidden="true" />

                        <h2 className={styles.channel_title}>
                            movieチャンネル
                        </h2>
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
                                    # {channel.movie_title}
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
                        setSelectedFriends([]);
                        setIsGroupNameOpen(true);
                    }}
                    onJoinClick={(joinedGroupId) => {
                        console.log("join group:", joinedGroupId);
                        setGroups((prevGroups) => [
                            ...prevGroups,
                            {
                                id: joinedGroupId,
                                name: `参加グループ`,
                                count: 1,
                                image: "/image/dummy-icon-man.png",
                            },
                        ]);
                    }}
                    onGroupClick={(group) => setSelectedGroup(group)}
                />
            )}

            {selectedGroup && (
                <GroupSettingsModal
                    group={selectedGroup}
                    onClose={() => setSelectedGroup(null)}
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
                                id: crypto.randomUUID(),
                                name,
                                count: selectedFriends.length + 1,
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
