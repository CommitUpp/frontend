export type RecommendMovie = {
    id: number;
    user: string;
    title: string;
    imageUrl: string;
    overview: string;
};

export const recommendMovies: RecommendMovie[] = [
    {
        id: 1,
        user: "りょうと",
        title: "トイ・ストーリー5",
        imageUrl: "/image/dami2.jpg",
        overview: "ウッディやバズたちが、子どもたちの遊びがデジタル機器中心へと変化する中で、おもちゃとしての役割や存在意義に向き合います。",
    },
];
