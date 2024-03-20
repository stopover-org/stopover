import { getGraphQLBaseUrl } from "lib/relay/environment";

async function postData(data: Record<string, any>, url: string) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    credentials: "include",
  });
  const json = await resp.json();

  return json;
}

export async function setupData(data: Record<string, any>) {
  return postData(data, `${new URL(getGraphQLBaseUrl()).origin}/test_setup`);
}

export function teardownData() {
  return postData({}, `${new URL(getGraphQLBaseUrl()).origin}/test_teardown`);
}
