import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";

export const PAGE_TITLE = "seo.myFirm.events.new.title";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.events.new.description",
      keywords: "seo.myFirm.events.new.keywords",
    },
    getVariables,
    props,
    true
  );
