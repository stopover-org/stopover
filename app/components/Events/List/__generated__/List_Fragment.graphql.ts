/**
 * @generated SignedSource<<c51c5bb78d122cd807443ccfe9ecf449>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type List_Fragment$data = {
  readonly id: string | null;
  readonly title: string | null;
  readonly description: string | null;
  readonly " $fragmentType": "List_Fragment";
};
export type List_Fragment$key = {
  readonly " $data"?: List_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"List_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "List_Fragment",
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
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "87d715337ea68cd8aa7fe110857aff9c";

export default node;
