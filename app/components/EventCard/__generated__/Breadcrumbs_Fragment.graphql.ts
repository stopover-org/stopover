/**
 * @generated SignedSource<<f0eb6e9e55efe4f6d0ec2ff68bbd56e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Breadcrumbs_Fragment$data = {
  readonly title: string;
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
