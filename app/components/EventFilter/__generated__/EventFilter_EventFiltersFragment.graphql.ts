/**
 * @generated SignedSource<<3301151502305dd04878af0ca53682d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventFilter_EventFiltersFragment$data = {
  readonly city: string | null;
  readonly endDate: any | null;
  readonly maxPrice: number;
  readonly minPrice: number;
  readonly startDate: any | null;
  readonly " $fragmentType": "EventFilter_EventFiltersFragment";
};
export type EventFilter_EventFiltersFragment$key = {
  readonly " $data"?: EventFilter_EventFiltersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventFilter_EventFiltersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventFilter_EventFiltersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minPrice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "maxPrice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    }
  ],
  "type": "EventFilters",
  "abstractKey": null
};

(node as any).hash = "fbb6992ce268088a2a0b980f1d1d9d53";

export default node;
