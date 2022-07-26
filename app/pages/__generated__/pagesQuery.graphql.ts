/**
 * @generated SignedSource<<270d36f174d8967f9f797d565004c7a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type EventTypeEnum = "excursion" | "tour" | "%future added value";
export type pagesQuery$variables = {};
export type pagesQuery$data = {
  readonly currentUser: {
    readonly id: string;
  } | null;
  readonly events: ReadonlyArray<{
    readonly id: string | null;
    readonly eventType: EventTypeEnum | null;
    readonly title: string | null;
    readonly description: string | null;
    readonly country: string | null;
    readonly city: string | null;
    readonly status: string | null;
    readonly eventOptions: ReadonlyArray<{
      readonly id: string | null;
      readonly relayId: string;
    }> | null;
    readonly interests: ReadonlyArray<{
      readonly id: string | null;
      readonly title: string | null;
    }> | null;
    readonly achievements: ReadonlyArray<{
      readonly title: string | null;
    }> | null;
  }> | null;
};
export type pagesQuery = {
  variables: pagesQuery$variables;
  response: pagesQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "currentUser",
  "plural": false,
  "selections": [
    (v0/*: any*/)
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventType",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "EventOption",
  "kind": "LinkedField",
  "name": "eventOptions",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "relayId",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Interest",
  "kind": "LinkedField",
  "name": "interests",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pagesQuery",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "events",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Achievement",
            "kind": "LinkedField",
            "name": "achievements",
            "plural": true,
            "selections": [
              (v3/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagesQuery",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "events",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Achievement",
            "kind": "LinkedField",
            "name": "achievements",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "198b10516f43c991b5bbf8790cdc3611",
    "id": null,
    "metadata": {},
    "name": "pagesQuery",
    "operationKind": "query",
    "text": "query pagesQuery {\n  currentUser {\n    id\n  }\n  events {\n    id\n    eventType\n    title\n    description\n    country\n    city\n    status\n    eventOptions {\n      id\n      relayId\n    }\n    interests {\n      id\n      title\n    }\n    achievements {\n      title\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2fe5574306041a73c20ef7df07bebadd";

export default node;
