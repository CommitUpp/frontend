"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./GroupNameModal.module.css";

type Friend = {
    id: number;
    name: string;
    image: string;
};

type Props = {
    selectedFriends: Friend[];
    onClose: () => void;
    onCreateGroup: (name: string, image: string) => void;
};

export default function GroupNameModal({
    selectedFriends,
    onClose,
    onCreateGroup,
}: Props) {
    const [groupName, setGroupName] = useState("");
    const [iconImage, setIconImage] = useState("/image/group_default_icon.png");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIconImage(URL.createObjectURL(file));
    };

    const handleCreate = () => {
        if (groupName.trim() === "") {
            alert("グループ名を入力してください");
            return;
        }

        onCreateGroup(groupName, iconImage);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal_wrap}>
                <button type="button" className={styles.back_button} onClick={onClose}>
                    <Image src="/image/arrow.png" alt="戻る" width={16} height={16} />
                </button>

                <div className={styles.title_wrap}>
                    <h1 className={styles.title}>あなたの友達</h1>
                    <button type="button" className={styles.create_button} onClick={handleCreate}>
                        作成
                    </button>
                </div>

                <div className={styles.group_name_wrap}>
                    <label className={styles.group_icon_label}>
                        <img src={iconImage} alt="グループアイコン" className={styles.group_icon} />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.file_input}
                        />
                    </label>

                    <input
                        className={styles.group_input}
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="グループ名"
                    />
                </div>

                <div className={styles.member_section}>
                    <h2 className={styles.member_title}>メンバー</h2>

                    <div className={styles.member_list}>
                        {selectedFriends.map((member) => (
                            <div className={styles.member_card} key={member.id}>
                                <Image
                                    src={member.image}
                                    alt=""
                                    width={46}
                                    height={46}
                                    className={styles.member_image}
                                />
                                <p>{member.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
