/**
 * @generated SignedSource<<d2cb279e1714926a9c00e8fb2bee6faf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WideCard_EventFragment$data = {
  readonly attendeeCostPerUomCents: number;
  readonly availableDates: ReadonlyArray<any>;
  readonly averageRating: number | null;
  readonly description: string;
  readonly id: string;
  readonly images: ReadonlyArray<string>;
  readonly interests: ReadonlyArray<{
    readonly id: string;
    readonly link: string | null;
    readonly title: string;
  }>;
  readonly ratingsCount: number | null;
  readonly tags: ReadonlyArray<{
    readonly id: string;
    readonly link: string | null;
    readonly title: string;
  }>;
  readonly title: string;
  readonly " $fragmentType": "WideCard_EventFragment";
};
export type WideCard_EventFragment$key = {
  readonly " $data"?: WideCard_EventFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WideCard_EventFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "link",
    "storageKey": null
  },
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WideCard_EventFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    (v1/*: any*/),
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
      "name": "images",
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
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Interest",
      "kind": "LinkedField",
      "name": "interests",
      "plural": true,
      "selections": (v2/*: any*/),
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
      "kind": "ScalarField",
      "name": "ratingsCount",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "a6e8c91b3bd35ccc4a9187e83eb94709";

export default node;
