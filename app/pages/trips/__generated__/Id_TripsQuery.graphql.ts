/**
 * @generated SignedSource<<ae6ffed2280d3eeeca8a6749fc35bb21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Id_TripsQuery$variables = {
  id: string;
};
export type Id_TripsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BookingsList_BookingsFragment">;
};
export type Id_TripsQuery = {
  response: Id_TripsQuery$data;
  variables: Id_TripsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Id_TripsQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "BookingsList_BookingsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Id_TripsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Booking",
        "kind": "LinkedField",
        "name": "bookings",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bookedFor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "92354d6d66d94a7eee10f4bf216a8a2a",
    "id": null,
    "metadata": {},
    "name": "Id_TripsQuery",
    "operationKind": "query",
    "text": "query Id_TripsQuery(\n  $id: ID!\n) {\n  ...BookingsList_BookingsFragment_1Bmzm5\n}\n\nfragment BookingsList_BookingsFragment_1Bmzm5 on Query {\n  bookings(id: $id) {\n    bookedFor\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b469d09bf18208be38071843940a0d37";

export default node;
