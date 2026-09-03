"use client";

import Image from "next/image";
import { X } from "lucide-react";
import styles from "./MatchingNotification.module.css";

export type MatchingParticipant = {
    name: string;
    imageUrl: string;
};

export type MatchingNotificationData = {
    id: string;
    movie: {
        title: string;
        thumbnailUrl: string;
    };
    participants: MatchingParticipant[];
};

type Props = {
    matching: MatchingNotificationData;
    isOpen: boolean;
    onClose: () => void;
    onStart?: () => void;
};

export default function MatchingNotification({
    matching,
    isOpen,
    onClose,
    onStart,
}: Props) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.notification}>
                <div className={styles.image_wrap}>
                    <Image
                        src={matching.movie.thumbnailUrl}
                        alt={matching.movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 62vw"
                        className={styles.image}
                    />
                </div>

                <section className={styles.content} aria-label="マッチング通知">
                    <button
                        type="button"
                        className={styles.close_button}
                        onClick={onClose}
                        aria-label="マッチング通知を閉じる"
                    >
                        <X size={32} aria-hidden="true" />
                    </button>

                    <div className={styles.content_inner}>
                        <div className={styles.text_wrap}>
                            <p className={styles.message}>マッチングしました</p>
                            <p className={styles.description}>72時間以内に同時視聴しましょう！</p>
                        </div>

                        <div className={styles.participants}>
                            {matching.participants.map((participant) => (
                                <div className={styles.participant} key={participant.name}>
                                    <Image
                                        src={participant.imageUrl}
                                        alt=""
                                        width={58}
                                        height={58}
                                        className={styles.avatar}
                                    />
                                    <p>{participant.name}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className={styles.start_button}
                            onClick={onStart}
                        >
                            同時視聴開始する ▶
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
