import useSWR from "swr";
import { getGroups } from "@/lib/api/groups";

export function useGroups(enabled = true) {
  return useSWR(enabled ? "groups" : null, getGroups);
}
