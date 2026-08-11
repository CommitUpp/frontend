import Image from "next/image";
import styles from "./GroupCreateModal.module.css";

type Group = {
    id: number;
    name: string;
    count: number;
    image: string;
};

type Props = {
    groups: Group[];
    onClose: () => void;
    onAddClick: () => void;
};

export default function GroupCreateModal({
    groups,
    onClose,
    onAddClick,
}: Props) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal_wrap} onClick={(e) => e.stopPropagation()}>
                <div className={styles.title_wrap}>
                    <button
                        type="button"
                        className={styles.back_button}
                        onClick={onClose}
                    >
                        <Image src="/image/arrow.png" alt="戻る" width={16} height={16} />
                    </button>
                    <h1 className={styles.title}>グループ一覧</h1>
                </div>

                <div className={styles.group_wrap}>
                    {groups.map((group) => (
                        <button
                            type="button"
                            className={styles.group_card}
                            key={group.id}
                            onClick={() => {
                                console.log("group selected:", group.id);
                            }}
                        >
                            <Image src={group.image} alt="" width={52} height={52} />
                            <div className={styles.text}>
                                <p>{group.name}</p>
                                <p>({group.count})</p>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    className={styles.add_button}
                    aria-label="追加"
                    onClick={onAddClick}
                ></button>
            </div>
        </div>
    );
}
