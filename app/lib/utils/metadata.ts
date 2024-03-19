import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "./defaultMetadata";

export type GenerateMetadataFn = (props: PageProps) => Promise<Metadata>;
export const generateCommonMetadata = async (
  translations: { title: string; description: string; keywords: string },
  getVariables: GetVariablesFn,
  props: PageProps,
  noindex: boolean = false,
  defaultValues: Record<string, string> = {},
  additionalMetadata: Partial<Metadata> = {}
): Promise<Metadata> => {
  const variables = merge(defaultValues, getVariables(props));
  const language = props.params.language || "en";
  const title = await translate(translations.title, variables, language);
  const description = await translate(
    translations.description,
    variables,
    language
  );
  const keywords = await translate(translations.keywords, variables, language);
  const noindexMetadata = {
    robots: {
      follow: false,
      index: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        nocache: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
  return merge(
    defaultMetadata,
    additionalMetadata,
    {
      title,
      description,
      keywords,
      openGraph: {
        language,
        title,
        description,
        keywords,
      },
    },
    noindex ? noindexMetadata : {}
  );
};
