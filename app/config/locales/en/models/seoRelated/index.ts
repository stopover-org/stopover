import { merge } from "lodash";
import seoMetadatum from "./seoMetadatum";
import article from "./article";

export default merge({}, article, seoMetadatum);
