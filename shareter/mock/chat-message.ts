export type ChatMessage = {
    id: number;
    user: string;
    text: string;
    time: string;
    is_mine: boolean;
    is_new?: boolean;
};

export const chatMessages: ChatMessage[] = [
    {
        id: 1,
        user: "やまけん",
        text: "わかる あの伏線そんな回収の仕方ある？！ってなった",
        time: "2:45",
        is_mine: false,
    },
    {
        id: 2,
        user: "やまけん",
        text: "しかも途中ちょっと怖かったのに、変なとこで笑わせてくるのずるい",
        time: "2:45",
        is_mine: false,
    },
    {
        id: 3,
        user: "りょうと",
        text: "わかる あの伏線そんな回収の仕方ある？！ってなった",
        time: "2:45",
        is_mine: true,
    },
    {
        id: 4,
        user: "りょうと",
        text: "しかも途中ちょっと怖かったのに、変なとこで笑わせてくるのずるい",
        time: "2:45",
        is_mine: true,
    },
];
