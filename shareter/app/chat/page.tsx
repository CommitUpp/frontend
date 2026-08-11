"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./page.module.css";

type Message = {
    id: number;
    user: string;
    text: string;
    time: string;
    is_mine: boolean;
    is_new?: boolean;
};

type Channel = {
    id: string;
    name: string;
    messages: Message[];
};

const initial_channels: Channel[] = [
    {
        id: "harry-potter",
        name: "ハリーポッター賢者の石",
        messages: [
            {
                id: 1,
                user: "やまけん",
                text: "わかる あの伏線そんな回収の仕方ある？！ってなった",
                time: "2:45",
                is_mine: false,
            },
            {
                id: 2,
                user: "やまけん",
                text: "しかも途中ちょっと怖かったのに、変なとこで笑わせてくるのずるい",
                time: "2:45",
                is_mine: false,
            },
            {
                id: 3,
                user: "りょうと",
                text: "わかる あの伏線そんな回収の仕方ある？！ってなった",
                time: "2:45",
                is_mine: true,
            },
            {
                id: 4,
                user: "りょうと",
                text: "しかも途中ちょっと怖かったのに、変なとこで笑わせてくるのずるい",
                time: "2:45",
                is_mine: true,
            },
        ],
    },
    {
        id: "avengers-civil-war",
        name: "アベンジャーズ シビル・ウォー",
        messages: [
            {
                id: 1,
                user: "けんた",
                text: "最後の戦いめっちゃ熱かった",
                time: "3:10",
                is_mine: false,
            },
            {
                id: 2,
                user: "りょうと",
                text: "キャップ派かアイアンマン派かで揉めそう笑",
                time: "3:12",
                is_mine: true,
            },
        ],
    },
    {
        id: "ironman-3",
        name: "アイアンマン3",
        messages: [
            {
                id: 1,
                user: "やまけん",
                text: "スーツが大量に飛んでくるシーン好き",
                time: "4:25",
                is_mine: false,
            },
        ],
    },
];

export default function ChatPage() {
    const [channels, setChannels] =
        useState<Channel[]>(initial_channels);

    const [selected_channel_id, setSelectedChannelId] =
        useState("harry-potter");

    const [input_text, setInputText] = useState("");

    const latest_message_ref =
        useRef<HTMLDivElement | null>(null);

    const selected_channel = channels.find(
        (channel) => channel.id === selected_channel_id
    );

    const previous_messages =
        selected_channel?.messages.filter(
            (message) => !message.is_new
        ) ?? [];

    const new_messages =
        selected_channel?.messages.filter(
            (message) => message.is_new
        ) ?? [];

    useEffect(() => {
        if (new_messages.length === 0) return;

        latest_message_ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [new_messages.length]);

    const handle_submit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const trimmed_text = input_text.trim();

        if (!trimmed_text) return;

        const new_message: Message = {
            id: Date.now(),
            user: "りょうと",
            text: trimmed_text,
            time: new Date().toLocaleTimeString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            is_mine: true,
            is_new: true,
        };

        setChannels((previous_channels) =>
            previous_channels.map((channel) => {
                if (channel.id !== selected_channel_id) {
                    return channel;
                }

                return {
                    ...channel,
                    messages: [
                        ...channel.messages,
                        new_message,
                    ],
                };
            })
        );

        setInputText("");
    };

    if (!selected_channel) {
        return null;
    }

    return (
        <main className={styles.chat_page}>
            <Sidebar
                selectedChannelId={selected_channel_id}
                onSelectChannel={setSelectedChannelId}
            />

            <section className={styles.chat_area}>
                <div className={styles.message_area}>
                    <div className={styles.message_list}>
                        {previous_messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.message_item} ${message.is_mine
                                        ? styles.is_mine
                                        : styles.is_other
                                    }`}
                            >
                                {!message.is_mine && (
                                    <div className={styles.user_icon}>
                                        <img
                                            src="/image/icon_dami1.png"
                                            alt=""
                                        />
                                    </div>
                                )}

                                <div className={styles.message_content}>
                                    <p className={styles.user_name}>
                                        {message.user}
                                    </p>

                                    <div className={styles.message_row}>
                                        {message.is_mine && (
                                            <time>{message.time}</time>
                                        )}

                                        <p
                                            className={
                                                styles.message_balloon
                                            }
                                        >
                                            {message.text}
                                        </p>

                                        {!message.is_mine && (
                                            <time>{message.time}</time>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.recommend_divider}>
                        <span />

                        <p>
                            りょうとがトイ・ストーリー5を
                            お勧めしました
                        </p>

                        <span />
                    </div>

                    <div className={styles.recommend_wrap}>
                        <p className={styles.recommend_user}>
                            りょうと
                        </p>

                        <article className={styles.movie_card}>
                            <div className={styles.movie_image}>
                                <img
                                    src="/image/dami2.jpg"
                                    alt="トイ・ストーリー5"
                                />
                            </div>

                            <div className={styles.movie_information}>
                                <h2>トイ・ストーリー5</h2>

                                <p>
                                    ウッディやバズたちが、
                                    子どもたちの遊びがデジタル機器中心へと
                                    変化する中で、おもちゃとしての役割や
                                    存在意義に向き合います。
                                </p>

                                <button type="button">
                                    同時視聴開始する
                                    <span>▶</span>
                                </button>
                            </div>
                        </article>
                    </div>

                    <div className={styles.new_message_list}>
                        {new_messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.message_item} ${message.is_mine
                                        ? styles.is_mine
                                        : styles.is_other
                                    }`}
                            >
                                {!message.is_mine && (
                                    <div className={styles.user_icon}>
                                        <img
                                            src="/image/icon_dami1.png"
                                            alt=""
                                        />
                                    </div>
                                )}

                                <div className={styles.message_content}>
                                    <p className={styles.user_name}>
                                        {message.user}
                                    </p>

                                    <div className={styles.message_row}>
                                        {message.is_mine && (
                                            <time>{message.time}</time>
                                        )}

                                        <p
                                            className={
                                                styles.message_balloon
                                            }
                                        >
                                            {message.text}
                                        </p>

                                        {!message.is_mine && (
                                            <time>{message.time}</time>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div ref={latest_message_ref} />
                    </div>
                </div>

                <form
                    className={styles.message_form}
                    onSubmit={handle_submit}
                >
                    <input
                        type="text"
                        value={input_text}
                        placeholder="Aa"
                        onChange={(event) =>
                            setInputText(event.target.value)
                        }
                    />

                    <button
                        type="submit"
                        aria-label="メッセージを送信"
                    >
                        ▶
                    </button>
                </form>
            </section>
        </main>
    );
}
