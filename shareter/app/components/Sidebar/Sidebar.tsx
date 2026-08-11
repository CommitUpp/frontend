"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import GroupCreateModal from "@/app/components/GroupCreateModal/GroupCreateModal";
import GroupListModal from "@/app/components/GroupListModal/GroupListModal";
import GroupSettingsModal from "@/app/components/GroupSettingsModal/GroupSettingsModal";
import { useGroupChatRooms } from "@/hooks/useGroupChatRooms";
import { createGroup, joinGroup } from "@/lib/api/groups";
import { mockMyGroups } from "@/mock/groups";
import styles from "./Sidebar.module.css";

const groupId = "4bb618e1-1fc2-457b-b635-bde0b1df667b";
const defaultGroupImage = "/image/no-image.png";

type Props = {
    selectedChannelId?: string;
    onSelectChannel?: (channelId: string) => void;
};

type Group = {
    id: string;
    name: string;
    member_count: number;
    image: string;
};

export default function Sidebar({
    selectedChannelId,
    onSelectChannel,
}: Props) {
    const router = useRouter();
    const { data: chatRoomsResponse } = useGroupChatRooms(groupId);
    const channels = chatRoomsResponse?.chat_rooms ?? [];
    const [isGroupListOpen, setIsGroupListOpen] = useState(false);
    const [isGroupCreateOpen, setIsGroupCreateOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
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

    const [groups, setGroups] = useState<Group[]>(
        mockMyGroups.groups.map((group) => ({
            ...group,
            image: defaultGroupImage,
        }))
    );
    const currentGroup = groups[0];

    return (
        <>
            <div className={styles.sidebar_wrap}>
                <button
                    type="button"
                    className={styles.group_wrap}
                    onClick={() => setIsGroupListOpen(true)}
                >
                    <Image
                        src={currentGroup?.image ?? defaultGroupImage}
                        alt="グループアイコン"
                        width={36}
                        height={36}
                        className={styles.group_image}
                    />

                    <div className={styles.group_info}>
                        <p className={styles.group_label}>グループ名</p>
                        <h2 className={styles.group_name}>
                            {currentGroup?.name ?? "グループ未選択"}
                        </h2>
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

            {isGroupListOpen && (
                <GroupListModal
                    groups={groups}
                    onClose={() => setIsGroupListOpen(false)}
                    onAddClick={() => {
                        if (groups.length >= 3) {
                            alert(
                                "グループは3つまでしか作成できません"
                            );
                            return;
                        }

                        setIsGroupListOpen(false);
                        setIsGroupCreateOpen(true);
                    }}
                    onJoinClick={async (joinedGroupId) => {
                        const response = await joinGroup(joinedGroupId);

                        setGroups((prevGroups) => [
                            ...prevGroups,
                            {
                                id: response.group.id,
                                name: response.group.name,
                                member_count: 1,
                                image: defaultGroupImage,
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

            {isGroupCreateOpen && (
                <GroupCreateModal
                    onClose={() => setIsGroupCreateOpen(false)}
                    onCreateGroup={async (name, image) => {
                        const response = await createGroup(name);

                        setGroups((prevGroups) => [
                            ...prevGroups,
                            {
                                id: response.group.id,
                                name: response.group.name,
                                member_count: 1,
                                image,
                            },
                        ]);

                        setIsGroupCreateOpen(false);
                        setIsGroupListOpen(true);
                    }}
                />
            )}
        </>
    );
}
