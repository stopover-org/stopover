/**
 * @generated SignedSource<<67a5b3f90d2b14d35cf73720acdd6286>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainInformation_Fragment$data = {
  readonly attendeePricePerUomCents: number;
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
      "name": "attendeePricePerUomCents",
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

(node as any).hash = "b76d8fe8c6ac0feada3dc51fab915abe";

export default node;
