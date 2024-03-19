import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";

export const PAGE_TITLE = "seo.firms.landing.title";
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
export const generateMetadata = async ({
  params,
}: {
  params: { language: string };
}): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.firms.landing.description",
      keywords: "seo.firms.landing.keywords",
    },
    getVariables,
    { params }
  );
