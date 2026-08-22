"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, SendHorizontal } from "lucide-react";
import styles from "./page.module.css";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const initialMessages = [
    {
        id: 1,
        user: "やまけん",
        image: "/image/dummy-icon-man.png",
        text: "え、ラスト普通に騙されたんだけど（笑）",
        mine: false,
    },
    {
        id: 2,
        user: "ことな",
        image: "/image/dummy-icon-man.png",
        text: "わかる あの伏線そんな回収の仕方ある？！ってなった",
        mine: false,
    },
    {
        id: 3,
        user: "ことな",
        image: "/image/dummy-icon-man.png",
        text: "しかも途中ちょっと怖かったのに、変なとこで笑わせてくるのずるい",
        mine: false,
    },
    {
        id: 4,
        user: "自分",
        image: "/image/dummy-icon-man.png",
        text: "主人公ずっと顔死んでたのに最後だけ急に熱かったよな\nあと音楽めっちゃ良くなかった？",
        mine: true,
    },
    {
        id: 5,
        user: "やまけん",
        image: "/image/dummy-icon-man.png",
        text: "それ！！映画館で観たかったタイプかも",
        mine: false,
    },
    {
        id: 6,
        user: "自分",
        image: "/image/dummy-icon-man.png",
        text: "でも正直あの友達ポジションのキャラはいらんかった気する（笑）",
        mine: true,
    },
];

export default function RoomPage({ params }: Props) {
    const { id } = use(params);
    const router = useRouter();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(initialMessages);

    const chatEndRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = () => {
        const t = input.trim();
        if (!t) return;

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                user: "自分",
                image: "/image/dummy-icon-man.png",
                text: t,
                mine: true,
            },
        ]);

        setInput("");
    };

    const [effects, setEffects] = useState<{ id: number; image: string }[]>([]);

    const showReaction = (image: string) => {
        const effectId = Date.now();

        setEffects((prev) => [...prev, { id: effectId, image }]);

        setTimeout(() => {
            setEffects((prev) => prev.filter((e) => e.id !== effectId));
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.live_text}>● LIVE</h1>
                <h2 className={styles.title}>のび太の海底鬼岩城</h2>

                <button
                    type="button"
                    className={styles.exit}
                    onClick={() => router.push("/premiumGuide")}
                >
                    <LogOut size={28} aria-hidden="true" />
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
                                <p className={styles.user}>{message.user}</p>
                            )}

                            <div className={styles.messageWrap}>
                                <div className={styles.message}>{message.text}</div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className={styles.reactionArea}>
                <button
                    type="button"
                    onClick={() => showReaction("/image/stamp-love.svg")}
                    aria-label="ラブリアクション"
                >
                    <Image
                        src="/image/stamp-love.svg"
                        alt=""
                        width={34}
                        height={34}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => showReaction("/image/stamp-sad.svg")}
                    aria-label="悲しいリアクション"
                >
                    <Image
                        src="/image/stamp-sad.svg"
                        alt=""
                        width={34}
                        height={34}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => showReaction("/image/stamp-fire.svg")}
                    aria-label="炎リアクション"
                >
                    <Image
                        src="/image/stamp-fire.svg"
                        alt=""
                        width={34}
                        height={34}
                    />
                </button>

                <div className={styles.effectArea}>
                    {effects.map((effect) => (
                        <Image
                            key={effect.id}
                            src={effect.image}
                            alt=""
                            width={70}
                            height={70}
                            className={styles.effect}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.SendArea}>
                <div className={styles.members}>
                    <Image src="/image/dummy-icon-man.png" alt="" width={34} height={34} className={styles.member} />
                    <Image src="/image/dummy-icon-man.png" alt="" width={34} height={34} className={styles.member} />
                    <Image src="/image/dummy-icon-man.png" alt="" width={34} height={34} className={styles.member} />
                    <Image src="/image/dummy-icon-man.png" alt="" width={34} height={34} className={styles.member} />
                </div>

                <div className={styles.inputArea}>
                    <input
                        type="text"
                        placeholder="Aa"
                        className={styles.textarea}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="button"
                        className={styles.send}
                        onClick={send}
                    >
                        <SendHorizontal size={26} className={styles.icon} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}
