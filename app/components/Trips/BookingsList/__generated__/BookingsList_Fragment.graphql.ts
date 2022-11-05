/**
 * @generated SignedSource<<f742b03ad29275bd6b692bd2beb38066>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BookingsList_Fragment$data = {
  readonly bookedFor: any;
  readonly " $fragmentType": "BookingsList_Fragment";
};
export type BookingsList_Fragment$key = {
  readonly " $data"?: BookingsList_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BookingsList_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BookingsList_Fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bookedFor",
      "storageKey": null
    }
  ],
  "type": "Booking",
  "abstractKey": null
};

(node as any).hash = "ae1f2f2729f7186c8e1d2d6b1cdd104b";

export default node;
