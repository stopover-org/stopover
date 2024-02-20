import {
  CacheConfig,
  Environment,
  GraphQLResponse,
  Network,
  QueryResponseCache,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";
import { createRelaySubscriptionHandler } from "graphql-ruby-client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const IS_SERVER = typeof window === typeof undefined;
const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results
export const getGraphQLBaseUrl = () =>
  process.env.GRAPHQL_API_URL || "http://localhost:8080/graphql";

export const getCookiesString = (cookiesObj: RequestCookie[] = []) =>
  cookiesObj.map(({ name, value }) => `${name}=${value}`).join(";");

export async function networkFetch(
  request: RequestParameters,
  variables: Variables,
  cookies: RequestCookie[] = []
): Promise<GraphQLResponse> {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cookie: getCookiesString(cookies),
  };

  const resp = await fetch(getGraphQLBaseUrl(), {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
    credentials: "include",
  });
  const json = await resp.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    throw new Error(
      `Error fetching GraphQL query '${
        request.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors
      )}`
    );
  }

  return json;
}

export const responseCache: QueryResponseCache | null = IS_SERVER
  ? null
  : new QueryResponseCache({
      size: 100,
      ttl: CACHE_TTL,
    });

function createNetwork(isServer = false, cookies: RequestCookie[] = []) {
  async function fetchResponse(
    params: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig
  ) {
    const isQuery = params.operationKind === "query";
    const cacheKey = params.id ?? params.cacheID;
    const forceFetch = cacheConfig && cacheConfig.force;
    if (responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(params, variables, cookies);
  }

  const subscriptionHandler = isServer
    ? undefined
    : createRelaySubscriptionHandler({
        // eslint-disable-next-line global-require
        cable: require("@rails/actioncable").createConsumer(
          getGraphQLBaseUrl().replace("https://", "ws://")
        ),
      });
  const network = Network.create(fetchResponse, subscriptionHandler);
  return network;
}

export function createEnvironment(cookies: RequestCookie[] = []) {
  return new Environment({
    network: createNetwork(IS_SERVER, cookies),
    store: new Store(RecordSource.create()),
    isServer: IS_SERVER,
  });
}

export const environment = createEnvironment();

export function getCurrentEnvironment(cookies: RequestCookie[]) {
  if (IS_SERVER) {
    return createEnvironment(cookies);
  }

  return environment;
}
