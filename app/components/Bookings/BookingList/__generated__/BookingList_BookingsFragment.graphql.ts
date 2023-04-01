/**
 * @generated SignedSource<<03092e5370dbe7f75c8b459b8fa49615>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BookingList_BookingsFragment$data = {
  readonly bookings: ReadonlyArray<{
    readonly bookedFor: any;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"Booking_BookingsFragment">;
  }> | null;
  readonly " $fragmentType": "BookingList_BookingsFragment";
};
export type BookingList_BookingsFragment$key = {
  readonly " $data"?: BookingList_BookingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BookingList_BookingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "filters"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "BookingList_BookingsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "filters",
          "variableName": "filters"
        }
      ],
      "concreteType": "Booking",
      "kind": "LinkedField",
      "name": "bookings",
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
          "name": "bookedFor",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Booking_BookingsFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "007504b8601d0dffdc599300ddb1b60f";

export default node;
