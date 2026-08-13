"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import styles from "./GroupCreateModal.module.css";

type Props = {
    onClose: () => void;
    onCreateGroup: (name: string, image: string) => Promise<void> | void;
};

export default function GroupCreateModal({
    onClose,
    onCreateGroup,
}: Props) {
    const [groupName, setGroupName] = useState("");
    const [iconImage, setIconImage] = useState("/image/group_default_icon.png");
    const [isCreating, setIsCreating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIconImage(URL.createObjectURL(file));
    };

    const handleCreate = async () => {
        if (groupName.trim() === "") {
            alert("グループ名を入力してください");
            return;
        }

        if (isCreating) return;

        setIsCreating(true);
        setErrorMessage("");

        try {
            await onCreateGroup(groupName.trim(), iconImage);
        } catch (error) {
            console.error("[GroupCreateModal] create group failed", error);
            setErrorMessage("グループの作成に失敗しました。時間をおいて再度お試しください。");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal_wrap}>
                <div className={styles.title_wrap}>
                    <button type="button" className={styles.back_button} onClick={onClose}>
                        <ChevronLeft size={32} aria-hidden="true" />
                    </button>
                    <h1 className={styles.title}>グループ作成</h1>
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

                <div className={styles.description_wrap}>
                    <p className={styles.description}>
                        作成後に発行されるグループIDを共有することで、メンバーを招待できます。
                    </p>
                    {errorMessage && (
                        <p className={styles.error_message}>{errorMessage}</p>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.create_button}
                    aria-label="作成"
                    onClick={handleCreate}
                    disabled={isCreating}
                >
                    {isCreating ? "作成中" : "作成"}
                </button>
            </div>
        </div>
    );
}
