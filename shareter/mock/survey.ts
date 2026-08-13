export type SurveyOption = {
    id: string;
    label: string;
};

export type SurveyQuestion = {
    id: string;
    label: string;
    options: SurveyOption[];
};

export const surveyQuestions: SurveyQuestion[] = [
    {
        id: "occupation",
        label: "職業",
        options: [
            {
                id: "junior_high_school_student",
                label: "中学生",
            },
            {
                id: "high_school_student",
                label: "高校生",
            },
            {
                id: "college_or_vocational_student",
                label: "大学生/専門学生",
            },
            {
                id: "company_employee",
                label: "会社員",
            },
            {
                id: "homemaker",
                label: "主婦",
            },
            {
                id: "other",
                label: "その他",
            },
        ],
    },
    {
        id: "favorite_genre",
        label: "よく見るジャンル",
        options: [
            {
                id: "action",
                label: "アクション",
            },
            {
                id: "comedy",
                label: "コメディ",
            },
            {
                id: "documentary",
                label: "ドキュメンタリー",
            },
            {
                id: "horror",
                label: "ホラー",
            },
            {
                id: "sf",
                label: "SF",
            },
            {
                id: "other",
                label: "その他",
            },
        ],
    },
    {
        id: "watch_time",
        label: "どんな時間帯に見るか",
        options: [
            {
                id: "morning",
                label: "朝（7:00〜10:00）",
            },
            {
                id: "daytime",
                label: "昼（10:00〜17:00）",
            },
            {
                id: "night",
                label: "夜（17:00〜24:00）",
            },
            {
                id: "late_night",
                label: "深夜（0:00〜7:00）",
            },
        ],
    },
];
