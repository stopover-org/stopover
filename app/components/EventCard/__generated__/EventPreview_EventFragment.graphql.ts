/**
 * @generated SignedSource<<d31dba24f5304be05c1952268327e585>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventPreview_EventFragment$data = {
  readonly images: ReadonlyArray<string>;
  readonly " $fragmentType": "EventPreview_EventFragment";
};
export type EventPreview_EventFragment$key = {
  readonly " $data"?: EventPreview_EventFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventPreview_EventFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventPreview_EventFragment",
  "selections": [
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

(node as any).hash = "9ca60ff60a38978f1a7f46c7fdc97240";

export default node;
