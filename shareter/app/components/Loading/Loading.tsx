import styles from "./Loading.module.css";

type LoadingProps = {
    label?: string;
};

export default function Loading({
    label = "取得中...",
}: LoadingProps) {
    return (
        <div className={styles.container} aria-busy="true" aria-label={label}>
            <div className={styles.spinner} />
            <p className={styles.label}>{label}</p>
        </div>
    );
}
