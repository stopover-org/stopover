import React from "react";
import { useSubscription as useOriginalSubscription } from "react-relay";
import { GraphQLSubscriptionConfig } from "relay-runtime";

function useSubscription(args: GraphQLSubscriptionConfig<any>) {
  const config = React.useMemo(() => args, [args]);

  return useOriginalSubscription(config);
}

export default useSubscription;
