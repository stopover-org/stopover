/**
 * @generated SignedSource<<92427a16da825060df5faadabf7b62a8>>
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
      "name": "tripId"
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
          "name": "tripId",
          "variableName": "tripId"
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

(node as any).hash = "1a6cbd61d12908c6b00a841c1014b0c7";

export default node;
