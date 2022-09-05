/**
 * @generated SignedSource<<405ba2b861d90a17ed58333f53646f28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainInformation_Fragment$data = {
  readonly availableDates: ReadonlyArray<any> | null;
  readonly " $fragmentType": "MainInformation_Fragment";
};
export type MainInformation_Fragment$key = {
  readonly " $data"?: MainInformation_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MainInformation_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MainInformation_Fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availableDates",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "74396e690e136e33848d29c4a16f8a69";

export default node;
