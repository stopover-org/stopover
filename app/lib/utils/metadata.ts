import { PageProps } from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";

export type GenerateMetadataFn = (props: PageProps) => Promise<Metadata>;
