/**
 * @generated SignedSource<<e799fd9bef3b00a22edc210428b51848>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type pagesQuery$variables = {};
export type pagesQuery$data = {
  readonly currentUser: {
    readonly id: string;
  } | null;
  readonly events: ReadonlyArray<{
    readonly id: string | null;
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
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = [
  {
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
  {
    "alias": null,
    "args": null,
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "events",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
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
      {
        "alias": null,
        "args": null,
        "concreteType": "Interest",
        "kind": "LinkedField",
        "name": "interests",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Achievement",
        "kind": "LinkedField",
        "name": "achievements",
        "plural": true,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pagesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "1379d7349704d4f32718428cae8eca85",
    "id": null,
    "metadata": {},
    "name": "pagesQuery",
    "operationKind": "query",
    "text": "query pagesQuery {\n  currentUser {\n    id\n  }\n  events {\n    id\n    eventOptions {\n      id\n      relayId\n    }\n    interests {\n      id\n      title\n    }\n    achievements {\n      title\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a28b298c68f63ec5d52e9a1525c18381";

export default node;
