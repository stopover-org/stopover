/**
 * @generated SignedSource<<404dc6e930793e4b58cd9b15ed7cd6d8>>
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
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
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          (v3/*: any*/),
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
            "selections": (v4/*: any*/),
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
              (v5/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Schedule",
            "kind": "LinkedField",
            "name": "schedules",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledFor",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
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
                  (v5/*: any*/)
                ],
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
    "cacheID": "113f7c908d8da81b52e17fb9787de2f3",
    "id": null,
    "metadata": {},
    "name": "Id_Query",
    "operationKind": "query",
    "text": "query Id_Query(\n  $id: ID!\n) {\n  event(id: $id) {\n    ...EventScene_EventFragment\n    id\n  }\n}\n\nfragment Breadcrumbs_EventFragment on Event {\n  interests {\n    id\n    title\n  }\n}\n\nfragment EventActions_EventFragment on Event {\n  id\n  unit {\n    name\n    id\n  }\n  schedules {\n    scheduledFor\n    id\n  }\n  attendeePricePerUom {\n    cents\n    currency {\n      name\n    }\n  }\n}\n\nfragment EventScene_EventFragment on Event {\n  ...Breadcrumbs_EventFragment\n  ...EventTitle_EventFragment\n  ...EventActions_EventFragment\n}\n\nfragment EventTitle_EventFragment on Event {\n  title\n  averageRating\n  tags {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "ebc9a1f2cde6e49326c575009d114960";

export default node;
