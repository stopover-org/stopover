/**
 * @generated SignedSource<<da13b84c394db9ffc317a5db75ac7826>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ItemGallery_InterestFragment$data = {
  readonly id: string;
  readonly preview: string | null;
  readonly title: string;
  readonly " $fragmentType": "ItemGallery_InterestFragment";
};
export type ItemGallery_InterestFragment$key = {
  readonly " $data"?: ItemGallery_InterestFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ItemGallery_InterestFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ItemGallery_InterestFragment",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preview",
      "storageKey": null
    }
  ],
  "type": "Interest",
  "abstractKey": null
};

(node as any).hash = "d9a331ffea0cad0544e45509e792a566";

export default node;
