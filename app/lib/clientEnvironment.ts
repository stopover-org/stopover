import { withHydrateDatetime } from "relay-nextjs/date";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { createRelaySubscriptionHandler } from "graphql-ruby-client";
import { fetchGraphQLRaw } from "./fetchGraphQL";

export function createClientNetworkWs(wsHandler: any) {
  return Network.create(async (params, variables) => {
    const response = await fetchGraphQLRaw(params.text!, variables);
    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  }, wsHandler);
}

export function createWsHandler() {
  // eslint-disable-next-line global-require
  const { createConsumer } = require("@rails/actioncable");
  let url = process.env.GRAPHQL_API_URL || "http://localhost:8080";
  url = `${url.replace(/https?/, "ws")}/cable`;
  return createRelaySubscriptionHandler({
    cable: createConsumer(url),
  });
}

export function getClientEnvironment() {
  if (typeof window === "undefined") return null;

  const w = window as any;

  if (w.relayEnvironment) return w.relayEnvironment;

  w.relayEnvironment = new Environment({
    network: createClientNetworkWs(createWsHandler()),
    store: new Store(new RecordSource()),
    isServer: false,
  });

  return w.relayEnvironment;
}
