/**
 * @generated SignedSource<<f6e3cbfff92ffad3cb7a18f4f29a8ff3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type List_InterestsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"InterestGallery_InterestsFragment">;
  readonly " $fragmentType": "List_InterestsFragment";
};
export type List_InterestsFragment$key = {
  readonly " $data"?: List_InterestsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"List_InterestsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "List_InterestsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InterestGallery_InterestsFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "aae6ca5386748687cd63e30622ea086d";

export default node;
