/**
 * @generated SignedSource<<a0db011f2f1130e08690c92d7a68c7f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DetailedInformation_Fragment$data = {
  readonly description: string | null;
  readonly " $fragmentType": "DetailedInformation_Fragment";
};
export type DetailedInformation_Fragment$key = {
  readonly " $data"?: DetailedInformation_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DetailedInformation_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DetailedInformation_Fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "baa69dd36d3faa1b0c1de87a6ef1e55b";

export default node;
