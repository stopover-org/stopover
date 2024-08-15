/**
 * @generated SignedSource<<34fce06483bb40a7c95c27cd795ba2f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AdapterType = "VIATOR_EVENT_SCRAPPER" | "%future added value";
export type SchedulingStatus = "ACTIVE" | "INACTIVE" | "%future added value";
export type scene_Scheduling_Query$variables = {
  id: string;
};
export type scene_Scheduling_Query$data = {
  readonly scheduling: {
    readonly adapterType: AdapterType;
    readonly configuration: string;
    readonly id: string;
    readonly name: string;
    readonly nextScheduleTime: string | null | undefined;
    readonly status: SchedulingStatus;
  } | null | undefined;
};
export type scene_Scheduling_Query = {
  response: scene_Scheduling_Query$data;
  variables: scene_Scheduling_Query$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Scheduling",
    "kind": "LinkedField",
    "name": "scheduling",
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
        "name": "status",
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
        "name": "adapterType",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "configuration",
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
    "name": "scene_Scheduling_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "scene_Scheduling_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "887f35e7eb46035401059bed3a4df921",
    "id": null,
    "metadata": {},
    "name": "scene_Scheduling_Query",
    "operationKind": "query",
    "text": "query scene_Scheduling_Query(\n  $id: ID!\n) {\n  scheduling(id: $id) {\n    id\n    name\n    status\n    nextScheduleTime\n    adapterType\n    configuration\n  }\n}\n"
  }
};
})();

(node as any).hash = "155b14e69afa4dcbac0111617761f732";

export default node;
