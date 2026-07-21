"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type WatchTogetherContextType = {
    isSelectingMovie: boolean;
    startSelecting: () => void;
    stopSelecting: () => void;
};

const WatchTogetherContext = createContext<WatchTogetherContextType | undefined>(undefined);

export function WatchTogetherProvider({ children }: { children: ReactNode }) {
    const [isSelectingMovie, setIsSelectingMovie] = useState(false);

    const startSelecting = () => setIsSelectingMovie(true);
    const stopSelecting = () => setIsSelectingMovie(false);

    return (
        <WatchTogetherContext.Provider value={{ isSelectingMovie, startSelecting, stopSelecting }}>
            {children}
        </WatchTogetherContext.Provider>
    );
}

export function useWatchTogether() {
    const context = useContext(WatchTogetherContext);
    if (!context) {
        throw new Error("useWatchTogether must be used within WatchTogetherProvider");
    }
    return context;
}