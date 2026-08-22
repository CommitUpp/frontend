"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Copy, Target, Users } from "lucide-react";
import styles from "./GroupSettingsModal.module.css";

type Group = {
    id: string;
    name: string;
    member_count: number;
    image: string;
};

type Props = {
    group: Group;
    onClose: () => void;
};

export default function GroupSettingsModal({ group, onClose }: Props) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(group.id);
        setIsCopied(true);
        window.setTimeout(() => setIsCopied(false), 1600);
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
                    <h1 className={styles.title}>グループ設定</h1>
                </div>

                <div className={styles.group_header}>
                    <Image
                        src={group.image}
                        alt=""
                        width={72}
                        height={72}
                        className={styles.group_image}
                    />
                    <div className={styles.group_text}>
                        <h2 className={styles.group_name}>{group.name}</h2>
                        <p className={styles.member_count}>{group.member_count}人</p>
                    </div>
                </div>

                <section className={styles.setting_section}>
                    <div className={styles.group_id_box}>
                        <p className={styles.group_id}>招待ID: {group.id}</p>
                        <button
                            type="button"
                            className={styles.copy_button}
                            onClick={handleCopyClick}
                        >
                            <Copy size={16} aria-hidden="true" />
                            {isCopied ? "コピー済み" : "コピー"}
                        </button>
                    </div>
                </section>

                <section className={styles.setting_section}>
                    <h2 className={styles.section_title}>設定</h2>
                    <div className={styles.setting_row}>
                        <Users size={20} aria-hidden="true" />
                        <div>
                            <p className={styles.setting_label}>メンバー</p>
                            <p className={styles.setting_value}>{group.member_count}人が参加中</p>
                        </div>
                    </div>
                    <div className={styles.setting_row}>
                        <Target size={20} aria-hidden="true" />
                        <div>
                            <p className={styles.setting_label}>月間目標</p>
                            <p className={styles.setting_value}>未設定</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
