import type { MatchingNotificationData } from "@/app/components/MatchingNotification/MatchingNotification";

export const matchingNotificationMock: MatchingNotificationData = {
    id: "matching-notification-1",
    movie: {
        title: "トイ・ストーリー5",
        thumbnailUrl: "/image/dummy-movie-trailer.jpg",
    },
    participants: [
        {
            name: "やまけん",
            imageUrl: "/image/dummy-icon-man.png",
        },
        {
            name: "自分",
            imageUrl: "/image/dummy-icon-woman-cap.png",
        },
    ],
};
