/**
 * @generated SignedSource<<b610f7c72d599b7b9a13529a19181cba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Card_Event$data = {
  readonly title: string | null;
  readonly description: string | null;
  readonly " $fragmentType": "Card_Event";
};
export type Card_Event$key = {
  readonly " $data"?: Card_Event$data;
  readonly " $fragmentSpreads": FragmentRefs<"Card_Event">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Card_Event",
  "selections": [
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

(node as any).hash = "a64c046cef01ef2aa4af967566f20634";

export default node;
