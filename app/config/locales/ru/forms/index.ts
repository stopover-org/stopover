import { merge } from "lodash";
import verifyStripeConnect from "./verifyStripeConnect";
import declineStripeConnect from "./declineStripeConnect";
import removeStripeConnect from "./removeStripeConnect";
import editFirm from "./editFirm";

export default merge(
  verifyStripeConnect,
  declineStripeConnect,
  removeStripeConnect,
  editFirm
);
