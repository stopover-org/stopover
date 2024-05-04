import { getGraphQLBaseUrl } from "lib/relay/environment";

async function postData(data: Record<string, any>, url: string) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (process.env.NODE_ENV === "test") {
    headers["X-Sandbox"] = "true";
  }

  // eslint-disable-next-line no-console
  console.log(
    `POST ${url} with ${JSON.stringify(data)} with headers ${JSON.stringify(
      headers
    )}`
  );

  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    credentials: "include",
  });

  return resp.json();
}

export async function setupData(data: Record<string, any>) {
  const rawResponse = await postData(
    data,
    `${new URL(getGraphQLBaseUrl()).origin}/test_setup`
  );

  return rawResponse
    .map((resp: string) => JSON.parse(resp))
    .map((resp: Record<string, any>) => {
      if (resp.user) {
        resp.user = JSON.parse(resp.user);
      }

      if (resp.account) {
        resp.account = JSON.parse(resp.account);
      }

      if (resp.event) {
        resp.event = JSON.parse(resp.event);
      }

      if (resp.schedule) {
        resp.schedule = JSON.parse(resp.schedule);
      }

      return resp;
    });
}

export async function teardownData() {
  return postData({}, `${new URL(getGraphQLBaseUrl()).origin}/test_teardown`);
}

export async function testSignIn({ email }: { email: string }) {
  return postData(
    { email },
    `${new URL(getGraphQLBaseUrl()).origin}/test_sign_in`
  );
}
