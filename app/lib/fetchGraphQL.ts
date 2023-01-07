export const getGraphQLBaseUrl = () =>
  process.env.GRAPHQL_API_URL || "http://localhost:8080/graphql";

export const getAdminBaseUrl = () =>
  getGraphQLBaseUrl().replace("graphql", "admin");

export async function fetchGraphQLRaw(
  query: string,
  variables: any = {},
  cookie?: string
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Cookie: cookie!, // used in SSR
  };

  const settings: RequestInit = {
    method: "POST",
    headers,
    credentials: "include", // https://github.com/developit/unfetch#fetchurl-string-options-object
    body: JSON.stringify({
      query,
      variables,
    }),
  };
  return fetch(getGraphQLBaseUrl(), settings);
}
