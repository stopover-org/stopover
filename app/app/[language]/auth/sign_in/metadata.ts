import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { generateCommonMetadata, GenerateMetadataFn } from "lib/utils/metadata";

export const PAGE_TITLE = "seo.auth.signIn.title";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
export const generateMetadata: GenerateMetadataFn = async (props: PageProps) =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.auth.signIn.description",
      keywords: "seo.auth.signIn.keywords",
    },
    getVariables,
    props,
    true
  );
