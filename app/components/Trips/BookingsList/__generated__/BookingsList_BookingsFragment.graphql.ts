/**
 * @generated SignedSource<<98b684801524afe2a2d694fd06287a35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BookingsList_BookingsFragment$data = {
  readonly bookings: ReadonlyArray<{
    readonly bookedFor: any;
    readonly id: string;
  }> | null;
  readonly " $fragmentType": "BookingsList_BookingsFragment";
};
export type BookingsList_BookingsFragment$key = {
  readonly " $data"?: BookingsList_BookingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BookingsList_BookingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "BookingsList_BookingsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
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
          "name": "bookedFor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "7a4521cbea47eab8f584f8b010f9b77b";

export default node;
