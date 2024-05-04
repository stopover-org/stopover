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
  const response = JSON.parse(
    await postData(data, `${new URL(getGraphQLBaseUrl()).origin}/test_setup`)
  );

  if (response.user) {
    response.user = JSON.parse(response.user);
  }

  if (response.account) {
    response.account = JSON.parse(response.account);
  }

  if (response.event) {
    response.event = JSON.parse(response.event);
  }

  if (response.schedule) {
    response.schedule = JSON.parse(response.schedule);
  }

  return response;
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
