"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import RecommendMovieCard from "./RecommendMovieCard";
import { chatMessages, type ChatMessage } from "@/mock/chat-message";
import { recommendMovies } from "@/mock/recommend-movie";
import styles from "./page.module.css";

export default function ChatPage() {
    return (
        <Suspense fallback={null}>
            <ChatPageContent />
        </Suspense>
    );
}

function ChatPageContent() {
    const searchParams = useSearchParams();
    const selected_chat_room_id = searchParams.get("chat_room_id") ?? "harry-potter";
    const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);

    const [input_text, setInputText] = useState("");

    const latest_message_ref = useRef<HTMLDivElement | null>(null);

    const previous_messages =
        messages.filter(
            (message) => !message.is_new
        );

    const new_messages =
        messages.filter(
            (message) => message.is_new
        );

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

        const new_message: ChatMessage = {
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

        setMessages((previous_messages) =>
            [
                ...previous_messages,
                new_message,
            ]
        );

        setInputText("");
    };

    return (
        <main className={styles.chat_page}>
            <Sidebar
                selectedChannelId={selected_chat_room_id}
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
                                            src="/image/dummy-icon-woman-cap.png"
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

                    {recommendMovies.map((movie) => (
                        <RecommendMovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}

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
                                            src="/image/dummy-icon-woman-cap.png"
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
