"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
                    type="button"
                    className={`${styles.menu_button} ${isDarkMenuButton ? styles.dark_menu_button : ""}`}
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu size={40} strokeWidth={2} />
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
