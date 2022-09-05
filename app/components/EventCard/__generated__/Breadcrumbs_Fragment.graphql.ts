/**
 * @generated SignedSource<<be0245505f9166a57be33d629ad04858>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Breadcrumbs_Fragment$data = {
  readonly interests: ReadonlyArray<{
    readonly id: string | null;
    readonly title: string | null;
  }> | null;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "fd0f2b642f5da8f1a746da81e3f9c446";

export default node;
