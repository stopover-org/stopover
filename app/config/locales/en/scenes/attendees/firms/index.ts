import { merge } from "lodash";
import newFirmScene from "./newFirmScene";
import firmLandingScene from "./firmLandingScene";
import firmWorkflowScene from "./firmWorkflowScene";

export default merge(newFirmScene, firmLandingScene, firmWorkflowScene);
