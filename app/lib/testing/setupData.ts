import { getGraphQLBaseUrl } from "lib/relay/environment";

/**
 * Parses a JSON string and returns it as a JavaScript object.
 *
 * @param {string} json - The JSON string to be parsed.
 * @returns {Record<string, any>} - The parsed JSON object.
 */
const parseJSON = (json: string): Record<string, any> => JSON.parse(json);
/**
 * Parses an array of JSON strings representing accounts and returns an array of account objects.
 *
 * @param {string[]} json - An array of JSON strings representing accounts.
 * @returns {Record<string, any>[]} - An array of account objects.
 */
const parseAccounts = (json: string[]): Record<string, any>[] =>
  json.map(parseJSON).map((account: Record<string, any>) => ({
    ...account,
    user: JSON.parse(account.user),
  }));

/**
 * Parses the given JSON string and returns the firm object.
 *
 * @param {string} json - The JSON string to parse.
 * @return {Record<string, any>} - The parsed firm object.
 */
const parseFirm = (json: string): Record<string, any> => {
  const firm = parseJSON(json);
  if (firm.accounts) {
    firm.accounts = parseAccounts(firm.accounts);
  }

  return firm;
};
/**
 * Sends a POST request with data to the given URL.
 *
 * @param {Record<string, any>} data - The data to send in the request body.
 * @param {string} url - The URL to send the request to.
 * @return {Promise<any>} - A promise that resolves to the JSON response from the server.
 */
async function postData(data: Record<string, any>, url: string) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (process.env.NODE_ENV === "test") {
    headers["X-Sandbox"] = "true";
  }

  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    credentials: "include",
  });

  return resp.json();
}

/**
 * Sets up data by making a POST request with the given data to the test_setup endpoint.
 * Returns the parsed response.
 *
 * @param {Record<string, any>} data - The data to be sent in the POST request.
 * @param {Array<Record<string, any>>} data.setup_variables - The setup variables to be sent in the POST request.
 * @param {boolean} [data.skip_delivery] - Whether to skip the delivery of the notifications.
 * @returns {Promise<Record<string, any>[]>} - A promise that resolves to an array of parsed response objects.
 */
export async function setupData(data: {
  setup_variables: Array<Partial<Record<"factory" | "attributes", any>>>;
  skip_delivery?: boolean;
}) {
  const execRequest = async () => {
    let rawResponse = await postData(
      data,
      `${new URL(getGraphQLBaseUrl()).origin}/test_setup`
    );

    if (!Array.isArray(rawResponse)) {
      rawResponse = [rawResponse];
    }

    rawResponse = rawResponse.map((resp: string) =>
      resp.replaceAll("&", "&amp;").replaceAll("'", "&#39;")
    );

    return rawResponse
      .map(
        /**
         * Parses the given response string into a JSON object
         *
         * @param {string} resp - The response string to be parsed
         * @returns {object} - The parsed JSON object
         */
        (resp: string) => JSON.parse(resp)
      )
      .map(
        /**
         * Parses JSON properties in the given response object.
         *
         * @param {Record<string, any>} resp - The response object to parse.
         * @returns {Record<string, any>} - The response object with parsed JSON properties.
         */
        (resp: Record<string, any>): Record<string, any> => {
          if (resp.user) {
            resp.user = parseJSON(resp.user);
          }

          if (resp.account) {
            resp.account = parseJSON(resp.account);
          }

          if (resp.accounts) {
            resp.accounts = parseAccounts(resp.accounts);
          }

          if (resp.event) {
            resp.event = parseJSON(resp.event);
          }

          if (resp.schedule) {
            resp.schedule = parseJSON(resp.schedule);
          }

          if (resp.seo_metadatum) {
            resp.seo_metadatum = parseJSON(resp.seo_metadatum);
          }

          if (resp.firm) {
            resp.firm = parseFirm(resp.firm);
          }

          return resp;
        }
      );
  };
  try {
    return await execRequest();
  } catch (error) {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return execRequest();
  }
}

/**
 * Tear down data.
 * @returns {Promise} - A promise that resolves when the teardown data is complete.
 */
export async function teardownData() {
  const execRequest = () =>
    postData({}, `${new URL(getGraphQLBaseUrl()).origin}/test_teardown`);
  try {
    return await execRequest();
  } catch (error) {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return execRequest();
  }
}

/**
 * Performs a test sign in with the given email.
 *
 * @async
 * @param {string} email - The email to be used for test sign in.
 * @return {Promise<any>} - A Promise that resolves to the test sign in response.
 */
export async function testSignIn({ email }: { email: string }) {
  return postData(
    { email },
    `${new URL(getGraphQLBaseUrl()).origin}/test_sign_in`
  );
}
