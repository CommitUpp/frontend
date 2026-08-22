"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useGroups } from "@/hooks/useGroups";
import { useAuth } from "@/contexts/AuthContext";

type GroupContextType = {
    selectedGroupId: string | null;
    setSelectedGroupId: (groupId: string) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
    const { session, isLoading: isAuthLoading } = useAuth();
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const { data: groupsResponse } = useGroups(Boolean(session?.access_token) && !isAuthLoading);
    const groups = useMemo(() => groupsResponse?.groups ?? [], [groupsResponse]);
    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    const currentGroupId = selectedGroup?.id ?? groups[0]?.id ?? null;

    return (
        <GroupContext.Provider value={{ selectedGroupId: currentGroupId, setSelectedGroupId }}>
            {children}
        </GroupContext.Provider>
    );
}

export function useGroup() {
    const context = useContext(GroupContext);

    if (!context) {
        throw new Error("useGroup must be used within GroupProvider");
    }

    return context;
}
