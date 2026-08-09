"use client";

import { useRouter } from "next/navigation";

import SelectMovie from "./SelectMovie";
// WatchRoomのimportは削除

export default function LiveArea() {
    const router = useRouter();

    return <SelectMovie onSearch={() => router.push("/search")} />;
}
