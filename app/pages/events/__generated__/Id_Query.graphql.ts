/**
 * @generated SignedSource<<9fed241a404e027ec81784f61dbdeb12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Id_Query$variables = {
  id: string;
};
export type Id_Query$data = {
  readonly currentUser: {
    readonly " $fragmentSpreads": FragmentRefs<"Layout_CurrentUserFragment">;
  } | null;
  readonly event: {
    readonly " $fragmentSpreads": FragmentRefs<"EventScene_EventFragment">;
  } | null;
};
export type Id_Query = {
  response: Id_Query$data;
  variables: Id_Query$variables;
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
},
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Id_Query",
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
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EventScene_EventFragment"
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
    "name": "Id_Query",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
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
                "args": null,
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "firm",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Interest",
            "kind": "LinkedField",
            "name": "interests",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "averageRating",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "tags",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Unit",
            "kind": "LinkedField",
            "name": "unit",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "availableDates",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "attendeePricePerUom",
            "plural": false,
            "selections": [
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
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Booking",
            "kind": "LinkedField",
            "name": "myBookings",
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
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Attendee",
                "kind": "LinkedField",
                "name": "attendees",
                "plural": true,
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
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
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9cb8223a2de3e07aeedd0a3f682d086b",
    "id": null,
    "metadata": {},
    "name": "Id_Query",
    "operationKind": "query",
    "text": "query Id_Query(\n  $id: ID!\n) {\n  currentUser {\n    ...Layout_CurrentUserFragment\n    id\n  }\n  event(id: $id) {\n    ...EventScene_EventFragment\n    id\n  }\n}\n\nfragment BookEvent_EventFragment on Event {\n  id\n  availableDates\n  myBookings {\n    bookedFor\n    trip {\n      id\n    }\n    attendees {\n      id\n    }\n    id\n  }\n  attendeePricePerUom {\n    cents\n    currency {\n      name\n    }\n  }\n}\n\nfragment Breadcrumbs_EventFragment on Event {\n  interests {\n    id\n    title\n  }\n}\n\nfragment EventActions_EventFragment on Event {\n  id\n  unit {\n    name\n    id\n  }\n  availableDates\n  attendeePricePerUom {\n    cents\n    currency {\n      name\n    }\n  }\n  myBookings {\n    id\n    bookedFor\n    trip {\n      id\n    }\n  }\n}\n\nfragment EventScene_EventFragment on Event {\n  ...Breadcrumbs_EventFragment\n  ...EventTitle_EventFragment\n  ...EventActions_EventFragment\n  ...LeftColumn_EventFragment\n  ...RightColumn_EventFragment\n  ...useBookEventForm_EventFragment\n}\n\nfragment EventTitle_EventFragment on Event {\n  title\n  averageRating\n  tags {\n    id\n    title\n  }\n}\n\nfragment Header_CurrentUserFragment on User {\n  id\n  status\n  account {\n    firm {\n      id\n    }\n    id\n  }\n}\n\nfragment Layout_CurrentUserFragment on User {\n  ...Header_CurrentUserFragment\n}\n\nfragment LeftColumn_EventFragment on Event {\n  images\n}\n\nfragment RightColumn_EventFragment on Event {\n  title\n  description\n  ...BookEvent_EventFragment\n}\n\nfragment useBookEventForm_EventFragment on Event {\n  id\n  availableDates\n  myBookings {\n    bookedFor\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "77c773d91e97d3c5930293694cce2a1b";

export default node;
