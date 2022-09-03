import { getRelaySerializedState } from "relay-nextjs";
import { withHydrateDatetime } from "relay-nextjs/date";
import { Environment, Network, Store, RecordSource } from "relay-runtime";
import { fetchGraphQLRaw } from "./fetchGraphQL";

export function createClientNetwork() {
  return Network.create(async (params, variables) => {
    const response = await fetchGraphQLRaw(params.text!, variables);

    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  });
}

export function getClientEnvironment() {
  if (typeof window === "undefined") return null;

  const w = window as any;
  if (w.relayEnvironment) return w.relayEnvironment as Environment;

  w.relayEnvironment = new Environment({
    network: createClientNetwork(),
    store: new Store(new RecordSource(getRelaySerializedState()?.records), {
      gcReleaseBufferSize: 50, // Unneeded query cache to keep in memory
      queryCacheExpirationTime: 24 * 60 * 60 * 1000, // Expiration time in milliseconds for query cache
    }),
    isServer: false,
  });

  return w.relayEnvironment as Environment;
}
