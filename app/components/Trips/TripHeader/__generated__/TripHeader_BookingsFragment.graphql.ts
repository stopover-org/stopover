/**
 * @generated SignedSource<<cb15bd607f88f4a840228ca0c9345131>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TripHeader_BookingsFragment$data = {
  readonly bookings: ReadonlyArray<{
    readonly bookedFor: any;
    readonly event: {
      readonly city: string | null;
    };
  }> | null;
  readonly " $fragmentType": "TripHeader_BookingsFragment";
};
export type TripHeader_BookingsFragment$key = {
  readonly " $data"?: TripHeader_BookingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TripHeader_BookingsFragment">;
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
  "name": "TripHeader_BookingsFragment",
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
          "concreteType": "Event",
          "kind": "LinkedField",
          "name": "event",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "city",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "41b97943b0efaa244e61ef43833733a9";

export default node;