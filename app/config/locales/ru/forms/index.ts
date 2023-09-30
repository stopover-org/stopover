import { merge } from "lodash";
import verifyStripeConnect from "./verifyStripeConnect";
import declineStripeConnect from "./declineStripeConnect";
import removeStripeConnect from "./removeStripeConnect";

export default merge(
  verifyStripeConnect,
  declineStripeConnect,
  removeStripeConnect
);
