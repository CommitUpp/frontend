"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SelectMovie from "./SelectMovie";
import MovieSearch from "./MovieSearch";
// WatchRoomのimportは削除

export type LiveStep =
    | "select"
    | "search"
    | "join";

export default function LiveArea() {
    const [status, setStatus] = useState<LiveStep>("select");

    const renderContent = () => {
        switch (status) {
            case "select":
                return <SelectMovie onSearch={() => setStatus("search")} />;

            case "search":
                return <MovieSearch />;

            default:
                return null;
        }
    };

    return <>{renderContent()}</>;
}
