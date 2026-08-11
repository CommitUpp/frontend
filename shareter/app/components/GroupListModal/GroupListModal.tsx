"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Settings } from "lucide-react";
import styles from "./GroupListModal.module.css";

type Group = {
    id: string;
    name: string;
    count: number;
    image: string;
};

type Props = {
    groups: Group[];
    onClose: () => void;
    onAddClick: () => void;
    onJoinClick: (groupId: string) => Promise<void> | void;
    onGroupClick: (group: Group) => void;
};

export default function GroupListModal({
    groups,
    onClose,
    onAddClick,
    onJoinClick,
    onGroupClick,
}: Props) {
    const [groupId, setGroupId] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleJoinClick = async () => {
        const trimmedGroupId = groupId.trim();

        if (!trimmedGroupId) {
            alert("招待IDを入力してください");
            return;
        }

        if (isJoining) return;

        setIsJoining(true);
        setErrorMessage("");

        try {
            await onJoinClick(trimmedGroupId);
            setGroupId("");
        } catch (error) {
            console.error("[GroupListModal] join group failed", error);
            setErrorMessage("グループへの参加に失敗しました。IDを確認して再度お試しください。");
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal_wrap} onClick={(e) => e.stopPropagation()}>
                <div className={styles.title_wrap}>
                    <button
                        type="button"
                        className={styles.back_button}
                        onClick={onClose}
                    >
                        <ChevronLeft size={32} aria-hidden="true" />
                    </button>
                    <h1 className={styles.title}>グループ一覧</h1>
                </div>

                <div className={styles.group_wrap}>
                    {groups.map((group) => (
                        <div className={styles.group_card} key={group.id}>
                            <button
                                type="button"
                                className={styles.group_select}
                                onClick={() => {
                                    console.log("group selected:", group.id);
                                }}
                            >
                                <Image src={group.image} alt="" width={52} height={52} />
                                <div className={styles.text}>
                                    <p>{group.name}</p>
                                    <p>({group.count})</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={styles.settings_button}
                                onClick={() => onGroupClick(group)}
                                aria-label={`${group.name}の設定を開く`}
                            >
                                <Settings size={22} aria-hidden="true" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.join_wrap}>
                    <label className={styles.join_label} htmlFor="join-group-id">
                        グループに参加
                    </label>
                    <div className={styles.join_form}>
                        <input
                            id="join-group-id"
                            type="text"
                            className={styles.join_input}
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            placeholder="招待ID"
                        />
                        <button
                            type="button"
                            className={styles.join_button}
                            onClick={handleJoinClick}
                            disabled={isJoining}
                        >
                            {isJoining ? "参加中" : "参加"}
                        </button>
                    </div>
                    {errorMessage && (
                        <p className={styles.error_message}>{errorMessage}</p>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.add_button}
                    aria-label="追加"
                    onClick={onAddClick}
                ></button>
            </div>
        </div>
    );
}
