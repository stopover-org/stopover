import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";

export const PAGE_TITLE = "seo.myFirm.events.id.edit.title";
export const getVariables: GetVariablesFn = (props: PageProps) => ({
  id: unescape(props.params.id),
});
export const revalidate = 0;
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.events.id.edit.description",
      keywords: "seo.myFirm.events.id.edit.keywords",
    },
    getVariables,
    props,
    true
  );
