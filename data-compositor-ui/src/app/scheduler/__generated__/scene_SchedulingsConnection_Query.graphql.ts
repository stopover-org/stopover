/**
 * @generated SignedSource<<56224a3ed2e008bf191eb1a9fc935435>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AdapterType = "VIATOR_EVENT_SCRAPPER" | "%future added value";
export type SchedulingStatus = "ACTIVE" | "INACTIVE" | "%future added value";
export type scene_SchedulingsConnection_Query$variables = Record<PropertyKey, never>;
export type scene_SchedulingsConnection_Query$data = {
  readonly schedulings: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly adapterType: AdapterType;
        readonly id: string;
        readonly name: string;
        readonly nextScheduleTime: string | null | undefined;
        readonly status: SchedulingStatus;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null | undefined;
      readonly totalCount: number | null | undefined;
    };
  };
};
export type scene_SchedulingsConnection_Query = {
  response: scene_SchedulingsConnection_Query$data;
  variables: scene_SchedulingsConnection_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SchedulingConnection",
    "kind": "LinkedField",
    "name": "schedulings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SchedulingEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Scheduling",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nextScheduleTime",
                "storageKey": null
              },
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
                "kind": "ScalarField",
                "name": "adapterType",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPreviousPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endCursor",
            "storageKey": null
          }
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
    "name": "scene_SchedulingsConnection_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "scene_SchedulingsConnection_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e0eebb446c34da582c15b497f531be36",
    "id": null,
    "metadata": {},
    "name": "scene_SchedulingsConnection_Query",
    "operationKind": "query",
    "text": "query scene_SchedulingsConnection_Query {\n  schedulings {\n    edges {\n      node {\n        id\n        name\n        nextScheduleTime\n        status\n        adapterType\n      }\n    }\n    pageInfo {\n      hasNextPage\n      totalCount\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7aed17db030c53492053669e3bdbd933";

export default node;
