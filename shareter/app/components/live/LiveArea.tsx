"use client";

import { useState } from "react";

import SelectMovie from "./SelectMovie";
import MovieSearch from "./MovieSearch";
import JoinRoom from "./JoinRoom";
import WatchRoom from "./WatchRoom";
import PremiumGuide from "./PremiumGuide";

export type LiveStep =
    | "select"   // 作品を選ぶ前
    | "search"   // 作品検索中
    | "join"     // 同時視聴に参加
    | "room"     // 同時視聴中
    | "premium"; // 無料枠終了

export default function LiveArea() {

    const [status, setStatus] = useState<LiveStep>("select");

    const renderContent = () => {
        switch (status) {

            case "select":
                return (
                    <SelectMovie
                        onSearch={() => setStatus("search")}
                    />
                );

            case "search":
                return (
                    <MovieSearch
                        onStartWatch={() => setStatus("room")}
                        onBack={() => setStatus("select")}
                    />
                );

            case "join":
                return (
                    <JoinRoom
                        onJoin={() => setStatus("room")}
                        onBack={() => setStatus("select")}
                    />
                );

            case "room":
                return (
                    <WatchRoom
                        onFinish={() => setStatus("premium")}
                    />
                );

            case "premium":
                return (
                    <PremiumGuide />
                );

            default:
                return null;
        }
    };

    return (
        <>
            {renderContent()}
        </>
    );
}