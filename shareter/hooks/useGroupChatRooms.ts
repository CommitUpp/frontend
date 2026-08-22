import useSWR from "swr";
import { getGroupChatRooms } from "@/lib/api/groups";

export function useGroupChatRooms(groupId: string | null | undefined) {
  return useSWR(
    groupId ? ["groupChatRooms", groupId] : null,
    ([, currentGroupId]: ["groupChatRooms", string]) => getGroupChatRooms(currentGroupId)
  );
}
