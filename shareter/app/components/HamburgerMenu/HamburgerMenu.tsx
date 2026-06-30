import Link from "next/link";
import Image from "next/image";
import styles from "./HamburgerMenu.module.css";
import "../../globals.css";

type Props = {
    onClose: () => void;
}

const menuItems = [
    { ja: "トップ", en: "TOP", href: "/" },
    { ja: "マイページ", en: "MY PAGE", href: "/mypage" },
    { ja: "検索", en: "SEARCH", href: "/serach" },
    { ja: "プラン", en: "PLAN", href: "/plan" },
    { ja: "アンケート", en: "SURVEY", href: "/survey" },
]

export default function HamburgerMenu({ onClose }: Props) {
    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.menu_wrap} onClick={(e) => e.stopPropagation()}>
                    <nav className={styles.nav}>
                        <button className={styles.close_button} onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect width="19.1439" height="1.91469" transform="matrix(0.711826 -0.702356 0.717008 0.697065 0 13.5557)" fill="white" />
                                <rect width="19.1366" height="1.91543" transform="matrix(-0.698708 -0.715407 0.729769 -0.683694 13.4863 15)" fill="white" />
                            </svg>
                        </button>
                        <ul>
                            {menuItems.map((item) => (
                                <li className={styles.menu_item} key={item.en}>
                                    <Link href={item.href}>
                                        <div className={styles.item_wrap}>
                                            <div className={styles.item_text}>
                                                <p>{item.ja}</p>
                                                <p>{item.en}</p>
                                            </div>
                                            <span className={styles.hamburger_menu_allow}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                    <path d="M8.75855 5.00291C8.58177 4.79077 8.26649 4.76211 8.05435 4.93889C7.84221 5.11567 7.81355 5.43095 7.99033 5.64309L8.37444 5.323L8.75855 5.00291ZM11.689 9.3005L12.0731 9.62059C12.2277 9.43517 12.2277 9.16583 12.0731 8.98041L11.689 9.3005ZM7.99033 12.9579C7.81355 13.1701 7.84221 13.4853 8.05435 13.6621C8.26649 13.8389 8.58177 13.8102 8.75855 13.5981L8.37444 13.278L7.99033 12.9579ZM8.37444 5.323L7.99033 5.64309L11.3049 9.62059L11.689 9.3005L12.0731 8.98041L8.75855 5.00291L8.37444 5.323ZM11.689 9.3005L11.3049 8.98041L7.99033 12.9579L8.37444 13.278L8.75855 13.5981L12.0731 9.62059L11.689 9.3005ZM9.5 0.5V1C14.1944 1 18 4.80558 18 9.5H18.5H19C19 4.25329 14.7467 -2.38419e-07 9.5 0V0.5ZM18.5 9.5H18C18 14.1944 14.1944 18 9.5 18V18.5V19C14.7467 19 19 14.7467 19 9.5H18.5ZM9.5 18.5V18C4.80558 18 1 14.1944 1 9.5H0.5H0C2.38419e-07 14.7467 4.25329 19 9.5 19V18.5ZM0.5 9.5H1C1 4.80558 4.80558 1 9.5 1V0.5V0C4.25329 2.38419e-07 -2.38419e-07 4.25329 0 9.5H0.5Z" fill="white" />
                                                </svg>
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}