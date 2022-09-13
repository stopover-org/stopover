/**
 * @generated SignedSource<<93925940343def1ffade412eea1afb04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Card_Event$data = {
  readonly description: string | null;
  readonly images: ReadonlyArray<string> | null;
  readonly tags: ReadonlyArray<{
    readonly id: string | null;
    readonly title: string | null;
  }> | null;
  readonly title: string | null;
  readonly " $fragmentType": "Card_Event";
};
export type Card_Event$key = {
  readonly " $data"?: Card_Event$data;
  readonly " $fragmentSpreads": FragmentRefs<"Card_Event">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Card_Event",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tag",
      "kind": "LinkedField",
      "name": "tags",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "images",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "557645b6f617dbfcabaa7a7d6aca4262";

export default node;
