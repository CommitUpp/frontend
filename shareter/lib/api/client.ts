import { supabase } from "@/lib/supabase";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

async function getAccessToken() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("[apiFetch] getSession failed", error);
    return null;
  }

  return data.session?.access_token ?? null;
}

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
  const { auth = true, ...requestOptions } = options;
  const url = `${API_BASE_URL}${path}`;
  const accessToken = auth ? await getAccessToken() : null;

  console.log("[apiFetch] request", {
    url,
    method: requestOptions.method ?? "GET",
    auth,
    hasAccessToken: Boolean(accessToken),
  });

  const res = await fetch(url, {
    ...requestOptions,
    headers: {
      ...(requestOptions.body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...requestOptions.headers,
    },
  });

  console.log("[apiFetch] response", {
    url,
    status: res.status,
    ok: res.ok,
  });

  return res;
}

export async function getErrorMessage(res: Response) {
  const text = await res.text();

  if (!text) {
    return `API request failed: ${res.status} ${res.statusText}`;
  }

  return `API request failed: ${res.status} ${res.statusText} - ${text}`;
}
