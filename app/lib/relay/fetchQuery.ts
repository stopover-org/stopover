import { cookies } from "next/headers";
import { getCookiesString, getGraphQLBaseUrl } from "./environment";

export default async function (query: string, variables: any) {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: getCookiesString(cookies().getAll()),
    };

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
    return null;
  }
}
