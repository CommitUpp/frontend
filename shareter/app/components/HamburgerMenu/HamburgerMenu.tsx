import Link from "next/link";
import { CircleChevronRight, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./HamburgerMenu.module.css";
import "../../globals.css";

type Props = {
    onClose: () => void;
}

const menuItems = [
    { ja: "トップ", en: "TOP", href: "/home" },
    { ja: "マイページ", en: "MY PAGE", href: "/mypage" },
    { ja: "検索", en: "SEARCH", href: "/search" },
    { ja: "プラン", en: "PLAN", href: "/plan" },
    { ja: "アンケート", en: "SURVEY", href: "/survey" },
]

export default function HamburgerMenu({ onClose }: Props) {
    const { user } = useAuth();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("ログアウトに失敗しました:", error.message);
            return;
        }

        window.location.replace("/landing-page");
    };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.menu_wrap} onClick={(e) => e.stopPropagation()}>
                    <nav className={styles.nav}>
                        <button type="button" className={styles.close_button} onClick={onClose}>
                            <X size={24} strokeWidth={2.5} />
                        </button>
                        <ul>
                            {menuItems.map((item) => (
                                <li className={styles.menu_item} key={item.en}>
                                    <Link href={item.href} onClick={onClose}>
                                        <div className={styles.item_wrap}>
                                            <div className={styles.item_text}>
                                                <p>{item.ja}</p>
                                                <p>{item.en}</p>
                                            </div>
                                            <span className={styles.hamburger_menu_allow}>
                                                <CircleChevronRight size={19} strokeWidth={1.75} />
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {user && (
                        <button type="button" className={styles.logout_button} onClick={handleLogout}>
                            ログアウト
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
