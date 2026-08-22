export type Watcher = {
    id: string;
    avatar_url: string;
};

export type WatchersResponse = {
    [movie_id: string]: Watcher[];
};

export const mockWatchersResponse: WatchersResponse = {
    "ed79d67e-1e52-4271-b81b-afd19c9ed313": [
        { id: "w1", avatar_url: "/image/dummy-icon-man.png" },
        { id: "w2", avatar_url: "/image/dummy-icon-woman-camera.png" },
        { id: "w3", avatar_url: "/image/dummy-icon-woman-cap.png" },
    ],
    "9e63f568-6bfd-4d56-9853-0f63181628b0": [
        { id: "w1", avatar_url: "/image/dummy-icon-woman-cap.png" },
        { id: "w2", avatar_url: "/image/dummy-icon-woman-camera.png" },
    ],
    "060b2a44-1843-4a4b-993a-c0c8eecc121b": [
        { id: "w1", avatar_url: "/image/dummy-icon-woman-cap.png" },
    ],
    "f3ba4dfc-1bb9-45c7-9563-4140a1df6485": [
        { id: "w1", avatar_url: "/image/dummy-icon-woman-cap.png" },
        { id: "w2", avatar_url: "/image/dummy-icon-woman-cap.png" },
    ],
    "b0323f56-69ee-485f-a040-567205854c65": [
        { id: "w1", avatar_url: "/image/dummy-icon-man.png" },
        { id: "w2", avatar_url: "/image/dummy-icon-woman-cap.png" },
        { id: "w3", avatar_url: "/image/dummy-icon-woman-camera.png" },
    ],
    "3152ce13-56bf-4c42-a497-90a840bdb373": [
        { id: "w1", avatar_url: "/image/dummy-icon-woman-camera.png" },
    ],
    "c94ab78d-e88b-4847-a3c9-266fb88c9fed": [
        { id: "w1", avatar_url: "/image/dummy-icon-woman-cap.png" },
        { id: "w2", avatar_url: "/image/dummy-icon-woman-camera.png" },
    ],
    "b02418fa-1c7f-414e-953b-057b5f32bfc2": [
        { id: "w1", avatar_url: "/image/dummy-icon-man.png" },
    ],
    "1e60ed89-dd0f-4645-bb95-8f4a8a5b5b0f": [
        { id: "w1", avatar_url: "/image/dummy-icon-man.png" },
        { id: "w2", avatar_url: "/image/dummy-icon-man.png" },
    ],
    "08dd5bff-f146-45b5-bb02-b4a2fb261879": [
        { id: "w1", avatar_url: "/image/dummy-icon-man.png" },
    ],
    "2a4dc7ba-9902-4acd-aaa4-41e8f8b1f1c5": [
        { id: "w1", avatar_url: "/image/dummy-icon-man.png" },
    ],
    "15d007f6-accd-4b40-9541-045037b6602f": [
        { id: "w1", avatar_url: "/image/dummy-icon-man.png" },
        { id: "w2", avatar_url: "/image/dummy-icon-man.png" },
    ],
};