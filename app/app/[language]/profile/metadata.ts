import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";

export const PAGE_TITLE = "seo.profile.title";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.profile.description",
      keywords: "seo.profile.keywords",
    },
    getVariables,
    props,
    true
  );
