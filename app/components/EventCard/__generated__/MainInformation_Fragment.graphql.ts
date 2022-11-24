/**
 * @generated SignedSource<<99a8095fd920c0019f7192ee7ff6760d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainInformation_Fragment$data = {
  readonly attendeeCostPerUomCents: number;
  readonly availableDates: ReadonlyArray<any>;
  readonly averageRating: number | null;
  readonly fullAddress: string;
  readonly tags: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  }>;
  readonly title: string;
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
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "4362646bc0970cd7319055c87b4bca41";

export default node;
