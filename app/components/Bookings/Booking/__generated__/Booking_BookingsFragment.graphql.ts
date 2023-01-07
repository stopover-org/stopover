/**
 * @generated SignedSource<<db4bf79990ccc80031f0c5524e24c16f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Booking_BookingsFragment$data = {
  readonly bookedFor: any;
  readonly event: {
    readonly description: string;
    readonly durationTime: string;
    readonly images: ReadonlyArray<string>;
    readonly title: string;
  };
  readonly id: string;
  readonly " $fragmentType": "Booking_BookingsFragment";
};
export type Booking_BookingsFragment$key = {
  readonly " $data"?: Booking_BookingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"Booking_BookingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Booking_BookingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bookedFor",
      "storageKey": null
    },
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
      "concreteType": "Event",
      "kind": "LinkedField",
      "name": "event",
      "plural": false,
      "selections": [
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
          "kind": "ScalarField",
          "name": "durationTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "images",
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
  "type": "Booking",
  "abstractKey": null
};

(node as any).hash = "06b257482e4f8bc814b4315efced5e62";

export default node;
