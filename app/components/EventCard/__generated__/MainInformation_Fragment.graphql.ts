/**
 * @generated SignedSource<<f32ea8310c1ddfa6ed46346325648e5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainInformation_Fragment$data = {
  readonly attendeeCostPerUomCents: number | null;
  readonly availableDates: ReadonlyArray<any> | null;
  readonly fullAddress: string | null;
  readonly tags: ReadonlyArray<{
    readonly id: string | null;
    readonly preview: string | null;
    readonly title: string | null;
  }> | null;
  readonly title: string | null;
  readonly " $fragmentType": "MainInformation_Fragment";
};
export type MainInformation_Fragment$key = {
  readonly " $data"?: MainInformation_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MainInformation_Fragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MainInformation_Fragment",
  "selections": [
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "fullAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "attendeeCostPerUomCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tag",
      "kind": "LinkedField",
      "name": "tags",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "preview",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "73530efb968088d1603303742a65f076";

export default node;
