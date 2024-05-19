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

/**
 * Create the authorized user.
 *
 * @param {boolean} [tokenOnly=true] - Whether to return only the access token of the user.
 * @param {Object} [attributes={}] - Additional attributes for the user.
 * @returns {Promise<string | Record<string, any> | null>} - A promise that resolves to the access token if `tokenOnly` is `true`.
 * Otherwise, resolves to the user information. If no user information is available, resolves to `undefined`.
 */
export async function getAuthorizedUser({
  tokenOnly = true,
  attributes = {},
}: {
  tokenOnly: boolean;
  attributes: Record<string, any>;
}) {
  const [user] = await setupData({
    setup_variables: [{ factory: "active_user", attributes }],
    skip_delivery: true,
  });
  if (tokenOnly) {
    return user?.access_token;
  }
  return user;
}

/**
 * Create a not authorized user.
 *
 * @param {boolean} tokenOnly - Indicates whether to return only the access token.
 * @param {Record<string, any>} attributes - Additional attributes for the user.
 * @returns {Promise<string | Record<string, any> | null>} - Returns a promise that resolves to the access token if `tokenOnly` is `true`.
 * Otherwise, resolves to the user information. If no user information is available, resolves to `undefined`.
 */
export async function getNotAuthorizedUser({
  tokenOnly = true,
  attributes = {},
}: {
  tokenOnly: boolean;
  attributes: Record<string, any>;
}) {
  const [user] = await setupData({
    setup_variables: [{ factory: "temporary_user", attributes }],
    skip_delivery: true,
  });
  if (tokenOnly) {
    return user?.access_token;
  }
  return user;
}

/**
 * Retrieves the manager user with specified options.
 *
 * @param {boolean} [options.tokenOnly=true] - Whether to only return the access token.
 * @param {Object} [options.attributes={}] - Additional attributes.
 * @returns {Promise<string | Record<string, any> | null>} - Returns a promise that resolves to the access token if `tokenOnly` is `true`,
 * or resolves to the user information. If no user information is available, resolves to `undefined`.
 */
export async function getManager({
  tokenOnly = true,
  attributes = {},
}: {
  tokenOnly: boolean;
  attributes: Record<string, any>;
}) {
  const [firm] = await setupData({
    setup_variables: [{ factory: "firm", attributes }],
    skip_delivery: true,
  });
  const user = firm?.accounts?.[0]?.user;
  if (tokenOnly) {
    return user?.access_token;
  }
  return user;
}

/**
 * Retrieves the restricted user.
 *
 * @param {boolean} [tokenOnly=true] - Specifies whether to return only the access token or the entire user object.
 * @param {Record<string, any>} attributes={} - Optional attributes to set up the user.
 * @returns {Promise<string | Record<string, any> | undefined>} - Returns a promise that resolves to the access token if `tokenOnly` is `true`.
 * Otherwise, resolves to the user information. If no user information is available, resolves to `undefined`.
 */
export async function getRestrictedUser({
  tokenOnly = true,
  attributes = {},
}: {
  tokenOnly: boolean;
  attributes: Record<string, any>;
}) {
  const [user] = await setupData({
    setup_variables: [{ factory: "disabled_user", attributes }],
    skip_delivery: true,
  });
  if (tokenOnly) {
    return user?.access_token;
  }
  return user;
}

/**
 * Create the service user.
 *
 * @param {boolean} tokenOnly - Indicates whether to return only the access token or the entire user object. Defaults to true.
 * @param {Record<string, any>} attributes - Additional attributes to be passed to the setupData method.
 * @returns {Promise<string | Record<string, any> | null>} - Returns a promise that resolves to the access token if `tokenOnly` is `true`.
 * Otherwise, resolves to the user information. If no user information is available, resolves to `undefined`.
 */
export async function getServiceUser({
  tokenOnly = true,
  attributes = {},
}: {
  tokenOnly: boolean;
  attributes: Record<string, any>;
}) {
  const [firm] = await setupData({
    setup_variables: [
      {
        factory: "firm",
        attributes: { with_service_user: true, ...attributes },
      },
    ],
    skip_delivery: true,
  });
  const user = firm?.accounts?.[0]?.user;
  if (tokenOnly) {
    return user?.access_token;
  }
  return user;
}
