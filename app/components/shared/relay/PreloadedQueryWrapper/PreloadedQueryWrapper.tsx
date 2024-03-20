"use client";

import { getCurrentEnvironment } from "lib/relay/environment";
import { PreloadedQuery, RelayEnvironmentProvider } from "react-relay";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ConcreteRequest, OperationType, VariablesOf } from "relay-runtime";
import React from "react";

export interface SceneProps<TQuery extends OperationType> {
  queryRef: PreloadedQuery<TQuery>;
}

export interface PageProps extends Record<string, any> {
  params: Record<string, any>;
  searchParams: Record<string, any>;
}

export type GetVariablesFn = <TQuery extends OperationType>(
  props: PageProps
) => VariablesOf<TQuery>;

type SceneComponent<TQuery extends OperationType> = React.ReactElement<
  SceneProps<TQuery>
>;

const PreloadedQueryWrapper = <TQuery extends OperationType>({
  preloadedQuery,
  cookies,
  children,
}: {
  preloadedQuery: SerializablePreloadedQuery<ConcreteRequest, TQuery>;
  cookies: RequestCookie[];
  children: SceneComponent<TQuery>;
}) => {
  const environment = getCurrentEnvironment(cookies);
  const queryRef: PreloadedQuery<TQuery> = useSerializablePreloadedQuery(
    environment,
    preloadedQuery
  );
  const Child: SceneComponent<TQuery> = React.Children.only(children);
  const Scene = React.cloneElement<SceneProps<TQuery>>(Child, {
    queryRef,
  });

  return (
    <RelayEnvironmentProvider environment={environment}>
      {Scene}
    </RelayEnvironmentProvider>
  );
};

export default React.memo(PreloadedQueryWrapper);
