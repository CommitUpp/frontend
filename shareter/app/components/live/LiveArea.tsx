"use client";

import { useState } from "react";

import SelectMovie from "./SelectMovie";
import MovieSearch from "./MovieSearch";
import WatchReady from "./WatchReady";
import WatchRoom from "./WatchRoom";
import PremiumGuide from "./PremiumGuide";

export type LiveStep =
    | "select"   // 作品を選ぶ前
    | "search"   // 作品検索中
    | "ready"    // 作品決定後の確認
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
                        onSelect={() => setStatus("ready")}
                    />
                );

            case "ready":
                return (
                    <WatchReady
                        onStart={() => setStatus("room")}
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