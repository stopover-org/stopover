/**
 * @generated SignedSource<<d17a4e89e285d75eab328b118bb22d1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CompactCard_EventFragment$data = {
  readonly attendeePricePerUom: {
    readonly cents: number;
    readonly currency: string;
  } | null;
  readonly availableDates: ReadonlyArray<any>;
  readonly averageRating: number;
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
  readonly " $fragmentType": "CompactCard_EventFragment";
};
export type CompactCard_EventFragment$key = {
  readonly " $data"?: CompactCard_EventFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CompactCard_EventFragment">;
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
  "name": "CompactCard_EventFragment",
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
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "attendeePricePerUom",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cents",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currency",
          "storageKey": null
        }
      ],
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

(node as any).hash = "d7c1ee5bfd9817b8cfe5f7f782cb7e1d";

export default node;
