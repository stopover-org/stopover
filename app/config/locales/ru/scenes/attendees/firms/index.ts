import { merge } from "lodash";
import newFirmScene from "./newFirmScene";
import firmLandingScene from "./firmLandingScene";
import firmWorkflowScenf from "./firmWorkflowScene";

export default merge({}, newFirmScene, firmLandingScene, firmWorkflowScenf);
