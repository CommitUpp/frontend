"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
        const handleSession = (isAuthenticated: boolean) => {
            const destination = isAuthenticated
                ? authenticatedPath
                : unauthenticatedPath;

            if (destination) {
                setCanRender(false);
                router.replace(destination);
                return;
            }

            setCanRender(true);
        };

        void supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                console.error("セッションの取得に失敗しました:", error.message);
            }
            handleSession(Boolean(data.session));
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => handleSession(Boolean(session))
        );

        return () => subscription.unsubscribe();
    }, [authenticatedPath, router, unauthenticatedPath]);

    return canRender ? children : null;
}
