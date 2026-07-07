"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./AddFriendsModal.module.css";

type Friend = {
    id: number;
    name: string;
    image: string;
};

type Props = {
    onClose: () => void;
    onNextClick: (friends: Friend[]) => void;
};

const friends = [
    { id: 1, name: "ことな", image: "/image/icon_dami1.png" },
    { id: 2, name: "yamagata", image: "/image/icon_dami5.png" },
    { id: 3, name: "やまけん", image: "/image/icon_dami1.png" },
    { id: 4, name: "にゃーニキ", image: "/image/icon_dami5.png" },
    { id: 5, name: "にょ", image: "/image/icon_dami1.png" },
    { id: 6, name: "うぎゃニキ", image: "/image/icon_dami5.png" },
];



export default function AddFriendsModal({ onClose, onNextClick }: Props) {
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal_wrap}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.title_wrap}>
                    <button className={styles.back_button} onClick={onClose}>
                        <Image src="/image/arrow.png" alt="戻る" width={16} height={16} />
                    </button>
                    <h1 className={styles.title}>あなたの友達</h1>
                </div>

                <div className={styles.friend_wrap}>
                    {friends.map((friend, index) => (
                        <label className={styles.friend_card} key={index}>
                            <div className={styles.friend_info}>
                                <Image
                                    src={friend.image}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className={styles.friend_image}
                                />
                                <p>{friend.name}</p>
                            </div>

                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={selectedFriends.some((f) => f.id === friend.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedFriends([...selectedFriends, friend]);
                                    } else {
                                        setSelectedFriends(
                                            selectedFriends.filter((f) => f.id !== friend.id)
                                        );
                                    }
                                }}
                            />
                        </label>
                    ))}
                </div>

                <button
                    className={styles.next_button}
                    onClick={() => onNextClick(selectedFriends)}
                >
                    次へ
                </button>
            </div>
        </div>
    );
}