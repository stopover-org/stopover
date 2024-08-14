/**
 * @generated SignedSource<<7e78d2af6481900a82adfa27eb6f1dc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AdapterType = "VIATOR_EVENT_SCRAPPER" | "%future added value";
export type SchedulingStatus = "ACTIVE" | "INACTIVE" | "%future added value";
export type page_SchedulingsConnection_Query$variables = Record<PropertyKey, never>;
export type page_SchedulingsConnection_Query$data = {
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
  };
};
export type page_SchedulingsConnection_Query = {
  response: page_SchedulingsConnection_Query$data;
  variables: page_SchedulingsConnection_Query$variables;
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
    "name": "page_SchedulingsConnection_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "page_SchedulingsConnection_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "74c68c7beb74d326b924cef1036233c4",
    "id": null,
    "metadata": {},
    "name": "page_SchedulingsConnection_Query",
    "operationKind": "query",
    "text": "query page_SchedulingsConnection_Query {\n  schedulings {\n    edges {\n      node {\n        id\n        name\n        nextScheduleTime\n        status\n        adapterType\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "241bd5b00d2ba030bd7619774f2fead4";

export default node;
