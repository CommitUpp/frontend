import { apiFetch, getErrorMessage } from "./client";

export type ChatRoom = {
  id: string;
  group_id: string;
  movie_id: string | null;
  movie_title: string;
  created_by: string;
  created_at: string;
};

export type GroupChatRoomsResponse = {
  chat_rooms: ChatRoom[];
};

export type ApiGroup = {
  id: string;
  name: string;
  monthlyGoal?: number;
  monthly_goal?: number;
  createdAt?: string;
  created_at?: string;
  memberCount?: number;
  member_count?: number;
  image?: string | null;
  image_url?: string | null;
  avatar_url?: string | null;
};

export type GetGroupsResponse = {
  groups: ApiGroup[];
};

export type CreateGroupResponse = {
  group: ApiGroup;
};

export type JoinGroupResponse = {
  group: ApiGroup;
};

export async function getGroups(): Promise<GetGroupsResponse> {
  const res = await apiFetch("/groups");

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

export async function createGroup(name: string): Promise<CreateGroupResponse> {
  const res = await apiFetch("/groups", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

export async function joinGroup(groupId: string): Promise<JoinGroupResponse> {
  const res = await apiFetch(`/groups/${groupId}/join`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

export async function getGroupMovies(group_id: string) {
  const res = await apiFetch(`/groups/${group_id}/watched-movies`);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

export async function getGroupChatRooms(group_id: string): Promise<GroupChatRoomsResponse> {
  const res = await apiFetch(`/groups/${group_id}/chat-rooms`);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}
