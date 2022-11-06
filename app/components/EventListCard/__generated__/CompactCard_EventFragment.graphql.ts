/**
 * @generated SignedSource<<be9f19bd5367e642f812df8a7c4fb8cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CompactCard_EventFragment$data = {
  readonly attendeeCostPerUomCents: number;
  readonly availableDates: ReadonlyArray<any>;
  readonly description: string;
  readonly id: string;
  readonly images: ReadonlyArray<string>;
  readonly interests: ReadonlyArray<{
    readonly id: string;
    readonly link: string | null;
    readonly title: string;
  }>;
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
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "3d94a1656776e33d4a6c433edb5a5930";

export default node;
