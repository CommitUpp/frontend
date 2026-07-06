"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./WatchRoom.module.css";

type Props = {
    onFinish: () => void;
};

const initialMessages = [
    {
        id: 1,
        user: "やまけん",
        image: "/image/dami1.png",
        text: "え、ラスト普通に騙されたんだけど（笑）",
        mine: false,
    },
    {
        id: 2,
        user: "ことな",
        image: "/image/dami1.png",
        text: "わかる あの伏線そんな回収の仕方ある？！ってなった",
        mine: false,
    },
    {
        id: 3,
        user: "ことな",
        image: "/image/dami1.png",
        text: "しかも途中ちょっと怖かったのに、変なとこで笑わせてくるのずるい",
        mine: false,
    },
    {
        id: 4,
        user: "自分",
        image: "/image/dami1.png",
        text: "主人公ずっと顔死んでたのに最後だけ急に熱かったよな\nあと音楽めっちゃ良くなかった？",
        mine: true,
    },
    {
        id: 5,
        user: "やまけん",
        image: "/image/dami1.png",
        text: "それ！！映画館で観たかったタイプかも",
        mine: false,
    },
    {
        id: 6,
        user: "自分",
        image: "/image/dami1.png",
        text: "でも正直あの友達ポジションのキャラはいらんかった気する（笑）",
        mine: true,
    },
];


export default function WatchRoom({ onFinish }: Props) {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(initialMessages);

    const send = () => {
        const t = input.trim();

        if (!t) return;

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                user: "自分",
                image: "/image/dami1.png",
                text: t,
                mine: true,
            },
        ]);

        setInput("");
    };


    return (
        <div className={styles.container}>

            <div className={styles.header}>

                <h1 className={styles.live_text}>
                    ● LIVE
                </h1>

                <h2 className={styles.title}>
                    のび太の海底鬼岩城
                </h2>

                <button
                    className={styles.leave}
                    onClick={onFinish}
                >
                    <Image
                        src="/image/loveStamp.svg"
                        alt="退出"
                        width={28}
                        height={28}
                    />
                    <span>退出</span>
                </button>

            </div>

            <div className={styles.chatArea}>

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.messageRow} ${message.mine ? styles.mine : ""}`}
                    >

                        {!message.mine && (
                            <Image
                                src={message.image}
                                alt=""
                                width={40}
                                height={40}
                                className={styles.avatar}
                            />
                        )}

                        <div>

                            {!message.mine && (
                                <p className={styles.user}>
                                    {message.user}
                                </p>
                            )}

                            <div className={styles.messageWrap}>

                                <div className={styles.message}>
                                    {message.text}
                                </div>

                            </div>

                        </div>

                    </div>

                ))}


            </div>

            <div className={styles.reactionArea}>

                <Image
                    src="/image/loveStamp.svg"
                    alt=""
                    width={34}
                    height={34}
                />

                <Image
                    src="/image/sadStamp.svg"
                    alt=""
                    width={34}
                    height={34}
                />

                <Image
                    src="/image/repeatStamp.svg"
                    alt=""
                    width={34}
                    height={34}
                />

            </div>

            <div className={styles.SendArea}>

                <div className={styles.members}>

                    <Image src="/image/dami1.png" alt="" width={42} height={42} className={styles.member} />
                    <Image src="/image/dami1.png" alt="" width={42} height={42} className={styles.member} />
                    <Image src="/image/dami1.png" alt="" width={42} height={42} className={styles.member} />
                    <Image src="/image/dami1.png" alt="" width={42} height={42} className={styles.member} />

                </div>

                <div className={styles.inputArea}>
                    <input
                        type="text"
                        placeholder='Aa'
                        className={styles.textarea}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="button"
                        className={styles.send}
                        onClick={send}
                    >
                        <Image src="/image/loveStamp.svg"
                            alt=""
                            width={42}
                            height={42}
                            className={styles.icon} />
                    </button>
                </div>

            </div>

        </div>
    );
}