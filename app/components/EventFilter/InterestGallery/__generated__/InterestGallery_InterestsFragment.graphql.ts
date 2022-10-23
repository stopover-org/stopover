/**
 * @generated SignedSource<<c8f327c974654691ea30605df945e40a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InterestGallery_InterestsFragment$data = {
  readonly interests: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ItemGallery_InterestFragment">;
  }> | null;
  readonly " $fragmentType": "InterestGallery_InterestsFragment";
};
export type InterestGallery_InterestsFragment$key = {
  readonly " $data"?: InterestGallery_InterestsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"InterestGallery_InterestsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InterestGallery_InterestsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Interest",
      "kind": "LinkedField",
      "name": "interests",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ItemGallery_InterestFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "b7a0d76cf94f8246790b875504f69f76";

export default node;
