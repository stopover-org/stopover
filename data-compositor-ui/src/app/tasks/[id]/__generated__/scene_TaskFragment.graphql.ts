/**
 * @generated SignedSource<<2bfb42e173fc031e864ba9465570d147>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type scene_TaskFragment$data = {
  readonly id: string;
  readonly scheduling: {
    readonly id: string;
    readonly name: string;
  };
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

(node as any).hash = "0fefcd835ab3892c194334800fce104c";

export default node;
