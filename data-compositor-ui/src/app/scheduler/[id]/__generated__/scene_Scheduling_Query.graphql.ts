/**
 * @generated SignedSource<<9afb1381a750e20a5e83280fda548379>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type scene_Scheduling_Query$variables = {
  id: string;
};
export type scene_Scheduling_Query$data = {
  readonly scheduling: {
    readonly " $fragmentSpreads": FragmentRefs<"scene_SchedulingFragment">;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "scene_Scheduling_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Scheduling",
        "kind": "LinkedField",
        "name": "scheduling",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "scene_SchedulingFragment"
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
    "name": "scene_Scheduling_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "662b37de36f57867812c03a3a7323d33",
    "id": null,
    "metadata": {},
    "name": "scene_Scheduling_Query",
    "operationKind": "query",
    "text": "query scene_Scheduling_Query(\n  $id: ID!\n) {\n  scheduling(id: $id) {\n    ...scene_SchedulingFragment\n    id\n  }\n}\n\nfragment DeleteSchedulingForm_SchedulingFragment on Scheduling {\n  id\n  status\n}\n\nfragment ScheduleSchedulingNowForm_SchedulingFragment on Scheduling {\n  id\n}\n\nfragment ToggleSchedulingForm_SchedulingFragment on Scheduling {\n  id\n}\n\nfragment scene_SchedulingFragment on Scheduling {\n  id\n  name\n  status\n  nextScheduleTime\n  adapterType\n  configuration\n  ...ToggleSchedulingForm_SchedulingFragment\n  ...ScheduleSchedulingNowForm_SchedulingFragment\n  ...DeleteSchedulingForm_SchedulingFragment\n}\n"
  }
};
})();

(node as any).hash = "a21ed8028c7011f036e6078a82b9b260";

export default node;
