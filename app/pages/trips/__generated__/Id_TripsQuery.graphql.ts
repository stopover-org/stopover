/**
 * @generated SignedSource<<3cb5505da2b8bd4439d1d205ddfad451>>
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
  readonly currentUser: {
    readonly account: {
      readonly trip: {
        readonly " $fragmentSpreads": FragmentRefs<"TripScene_TripFragment">;
      };
    };
    readonly " $fragmentSpreads": FragmentRefs<"Layout_CurrentUserFragment">;
  } | null;
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
    "name": "tripId",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cents",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Currency",
    "kind": "LinkedField",
    "name": "currency",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
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
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Layout_CurrentUserFragment"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "TripScene_TripFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
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
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cities",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startDate",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "leftToPayPrice",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "alreadyPaidPrice",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Attendee",
                        "kind": "LinkedField",
                        "name": "attendees",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/)
                        ],
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
                          (v2/*: any*/),
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
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6d765c7cd4f8bf6737abb231c29f5130",
    "id": null,
    "metadata": {},
    "name": "Id_TripsQuery",
    "operationKind": "query",
    "text": "query Id_TripsQuery(\n  $id: ID!\n) {\n  currentUser {\n    ...Layout_CurrentUserFragment\n    account {\n      trip(tripId: $id) {\n        ...TripScene_TripFragment\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment BookingCard_BookingFragment on Booking {\n  id\n  bookedFor\n  leftToPayPrice {\n    cents\n    currency {\n      name\n    }\n  }\n  alreadyPaidPrice {\n    cents\n    currency {\n      name\n    }\n  }\n  attendees {\n    id\n  }\n  event {\n    id\n    images\n    title\n    description\n    durationTime\n  }\n  ...BookingTime_BookingFragment\n  ...BookingSummary_BookingFragment\n}\n\nfragment BookingSummary_BookingFragment on Booking {\n  leftToPayPrice {\n    cents\n    currency {\n      name\n    }\n  }\n  alreadyPaidPrice {\n    cents\n    currency {\n      name\n    }\n  }\n  attendees {\n    id\n  }\n}\n\nfragment BookingTime_BookingFragment on Booking {\n  bookedFor\n  event {\n    durationTime\n    id\n  }\n}\n\nfragment DateBookingsSection_TripFragment on Trip {\n  bookings {\n    id\n    bookedFor\n    ...BookingCard_BookingFragment\n  }\n}\n\nfragment Header_CurrentUserFragment on User {\n  id\n  status\n}\n\nfragment Layout_CurrentUserFragment on User {\n  ...Header_CurrentUserFragment\n}\n\nfragment TripScene_TripFragment on Trip {\n  id\n  cities\n  startDate\n  status\n  endDate\n  bookings {\n    bookedFor\n    id\n  }\n  ...DateBookingsSection_TripFragment\n}\n"
  }
};
})();

(node as any).hash = "d6a8015d1ccb3c24cb4a8e55734c987b";

export default node;
