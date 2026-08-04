"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
    children?: React.ReactNode;
    authenticatedPath?: string;
    unauthenticatedPath?: string;
};

export default function AuthGate({
    children,
    authenticatedPath,
    unauthenticatedPath,
}: Props) {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const destination = user ? authenticatedPath : unauthenticatedPath;
    const canRender = !isLoading && !destination;

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (destination) {
            router.replace(destination);
        }
    }, [destination, isLoading, router]);

    return canRender ? children : null;
}
