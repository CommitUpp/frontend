"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "../../globals.css";
import styles from "./Header.module.css";

// ハンバーガーメニューのボタンを暗い色にするパスのリスト
const darkMenuButtonPaths = ["/chat"];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isDarkMenuButton = darkMenuButtonPaths.includes(pathname);

    if (pathname === "/landing-page") {
        return null;
    }

    return (
        <>
            <header className={styles.header}>
                <button
                    className={`${styles.menu_button} ${isDarkMenuButton ? styles.dark_menu_button : ""}`}
                    onClick={() => setIsMenuOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="22" viewBox="0 0 32 22" fill="none">
                        <line y1="1" x2="32" y2="1" stroke="currentColor" strokeWidth="2" />
                        <line y1="11" x2="32" y2="11" stroke="currentColor" strokeWidth="2" />
                        <line y1="21" x2="32" y2="21" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </button>
            </header>

            {isMenuOpen && (
                <HamburgerMenu
                    onClose={() => setIsMenuOpen(false)}
                />
            )}
        </>
    );
}
