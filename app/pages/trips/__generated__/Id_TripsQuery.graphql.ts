/**
 * @generated SignedSource<<be2c6dd334aba35108a910915fa277c5>>
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
  readonly " $fragmentSpreads": FragmentRefs<"BookingList_BookingsFragment" | "TripHeader_BookingsFragment">;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
        "name": "BookingList_BookingsFragment"
      },
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "TripHeader_BookingsFragment"
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
          (v2/*: any*/),
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
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "event",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "durationTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "images",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6f1781a679ab37e861ac33034a0eb948",
    "id": null,
    "metadata": {},
    "name": "Id_TripsQuery",
    "operationKind": "query",
    "text": "query Id_TripsQuery(\n  $id: ID!\n) {\n  ...BookingList_BookingsFragment_1Bmzm5\n  ...TripHeader_BookingsFragment_1Bmzm5\n}\n\nfragment BookingList_BookingsFragment_1Bmzm5 on Query {\n  bookings(id: $id) {\n    id\n    bookedFor\n    ...Booking_BookingsFragment\n  }\n}\n\nfragment Booking_BookingsFragment on Booking {\n  bookedFor\n  id\n  event {\n    description\n    durationTime\n    images\n    title\n    id\n  }\n}\n\nfragment TripHeader_BookingsFragment_1Bmzm5 on Query {\n  bookings(id: $id) {\n    bookedFor\n    event {\n      city\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4260f74cd6851f067a4aad064606ea5a";

export default node;
