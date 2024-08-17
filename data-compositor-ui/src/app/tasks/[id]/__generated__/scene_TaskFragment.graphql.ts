/**
 * @generated SignedSource<<1237569f9b3f758312fd8609096c4521>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AdapterType = "VIATOR_EVENT_SCRAPPER" | "%future added value";
export type TaskStatus = "COMPLETED" | "FAILED" | "PENDING" | "PROCESSING" | "TERMINATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type scene_TaskFragment$data = {
  readonly adapterType: AdapterType;
  readonly configuration: string;
  readonly id: string;
  readonly scheduling: {
    readonly id: string;
    readonly name: string;
  };
  readonly status: TaskStatus;
  readonly " $fragmentType": "scene_TaskFragment";
};
export type scene_TaskFragment$key = {
  readonly " $data"?: scene_TaskFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"scene_TaskFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "scene_TaskFragment",
  "selections": [
    (v0/*: any*/),
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "configuration",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Scheduling",
      "kind": "LinkedField",
      "name": "scheduling",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
  ],
  "type": "Task",
  "abstractKey": null
};
})();

(node as any).hash = "28cf4997d9e5f48b4d5469b1bffff047";

export default node;
