/**
 * @generated SignedSource<<29622a3854815de7a7d605d1fd749310>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Breadcrumbs_Fragment$data = {
  readonly title: string | null;
  readonly " $fragmentType": "Breadcrumbs_Fragment";
};
export type Breadcrumbs_Fragment$key = {
  readonly " $data"?: Breadcrumbs_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"Breadcrumbs_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Breadcrumbs_Fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "c9e489f658b155cbdd5a2ed01908d94d";

export default node;
