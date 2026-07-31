"use client";

import AuthGate from "./components/AuthGate/AuthGate";

export default function RootPage() {
    return (
        <AuthGate
            authenticatedPath="/home"
            unauthenticatedPath="/landing-page"
        />
    );
}
