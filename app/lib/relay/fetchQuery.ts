import { cookies } from "next/headers";
import { getCookiesString, getGraphQLBaseUrl } from "./environment";

export default async function (query: string, variables: any) {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: getCookiesString(cookies().getAll()),
    };

    if (process.env.NODE_ENV === "test") {
      headers["X-Sandbox"] = "true";
    }

    const resp = await fetch(getGraphQLBaseUrl(), {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      credentials: "include",
    });
    const json = await resp.json();

    if (Array.isArray(json.errors)) {
      return null;
    }

    return json.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
