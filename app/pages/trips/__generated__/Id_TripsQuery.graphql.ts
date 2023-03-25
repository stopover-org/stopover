/**
 * @generated SignedSource<<7874ca216ab5a5807089ae5cdb47e413>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BookingsFilter = {
  eventId?: string | null;
  scheduledFor?: any | null;
  status?: string | null;
  tripId?: ReadonlyArray<string> | null;
};
export type Id_TripsQuery$variables = {
  filters: BookingsFilter;
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
    "name": "filters"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "filters",
    "variableName": "filters"
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
    "cacheID": "c81c02e7410e04c08487d02fbd7ee32b",
    "id": null,
    "metadata": {},
    "name": "Id_TripsQuery",
    "operationKind": "query",
    "text": "query Id_TripsQuery(\n  $filters: BookingsFilter!\n) {\n  ...BookingList_BookingsFragment_VTAHT\n  ...TripHeader_BookingsFragment_VTAHT\n}\n\nfragment BookingList_BookingsFragment_VTAHT on Query {\n  bookings(filters: $filters) {\n    id\n    bookedFor\n    ...Booking_BookingsFragment\n  }\n}\n\nfragment Booking_BookingsFragment on Booking {\n  bookedFor\n  id\n  event {\n    description\n    durationTime\n    images\n    title\n    id\n  }\n}\n\nfragment TripHeader_BookingsFragment_VTAHT on Query {\n  bookings(filters: $filters) {\n    bookedFor\n    event {\n      city\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "14856de18d09621cbfbaf31715a897cf";

export default node;
