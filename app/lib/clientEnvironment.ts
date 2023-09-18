import { getRelaySerializedState } from "relay-nextjs";
import { withHydrateDatetime } from "relay-nextjs/date";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { createRelaySubscriptionHandler } from "graphql-ruby-client";
import { fetchGraphQLRaw } from "./fetchGraphQL";

function createClientNetworkWs(wsHandler: any) {
  return Network.create(async (params, variables) => {
    const response = await fetchGraphQLRaw(params.text!, variables);
    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  }, wsHandler);
}

export function getClientEnvironment() {
  if (typeof window === "undefined") return null;

  // eslint-disable-next-line global-require
  const { createConsumer } = require("@rails/actioncable");
  const wsHandler = createRelaySubscriptionHandler({
    cable: createConsumer("ws://localhost:8080/cable"),
  });
  const w = window as any;

  if (w.relayEnvironment) return w.relayEnvironment as Environment;

  w.relayEnvironment = new Environment({
    network: createClientNetworkWs(wsHandler),
    store: new Store(new RecordSource(getRelaySerializedState()?.records), {
      gcReleaseBufferSize: 50, // Unneeded query cache to keep in memory
      queryCacheExpirationTime: 24 * 60 * 60 * 1000, // Expiration time in milliseconds for query cache
    }),
    isServer: false,
  });

  return w.relayEnvironment as Environment;
}
