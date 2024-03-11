import { graphql, useFragment } from "react-relay";
import useMutationForm from "lib/hooks/useMutationForm";
import { useEditSeoMetadataForm_UpdateSeoMetadataMutation } from "artifacts/useEditSeoMetadataForm_UpdateSeoMetadataMutation.graphql";
import React from "react";
import * as Yup from "yup";
import { useEditSeoMetadataForm_SeoMetadatumFragment$key } from "artifacts/useEditSeoMetadataForm_SeoMetadatumFragment.graphql";
import { yupResolver } from "@hookform/resolvers/yup";

interface EditSeoMetadataFirmFormFields {
  seoMetadatumId: string;
  title: string;
  description: string;
  keywords: string;
  language: string;
}

function useDefaultValues(
  seoMetadatumFragmentRef: useEditSeoMetadataForm_SeoMetadatumFragment$key
): EditSeoMetadataFirmFormFields {
  const metadata = useFragment<useEditSeoMetadataForm_SeoMetadatumFragment$key>(
    graphql`
      fragment useEditSeoMetadataForm_SeoMetadatumFragment on SeoMetadatum {
        id
        title
        description
        keywords
        language
      }
    `,
    seoMetadatumFragmentRef
  );

  return React.useMemo(
    () => ({
      seoMetadatumId: metadata.id,
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      language: metadata.language,
    }),
    [metadata]
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  keywords: Yup.string().required(),
  language: Yup.string().required(),
});

export function useEditSeoMetadataForm(
  seoMetadatumFragmentRef: useEditSeoMetadataForm_SeoMetadatumFragment$key,
  onSuccess?: () => void
) {
  return useMutationForm<
    EditSeoMetadataFirmFormFields,
    useEditSeoMetadataForm_UpdateSeoMetadataMutation
  >(
    graphql`
      mutation useEditSeoMetadataForm_UpdateSeoMetadataMutation(
        $input: UpdateSeoMetadataInput!
      ) {
        updateSeoMetadata(input: $input) {
          seoMetadatum {
            ...useEditSeoMetadataForm_SeoMetadatumFragment
          }
          errors
          notification
        }
      }
    `,
    (values) => ({
      input: values,
    }),
    {
      defaultValues: useDefaultValues(seoMetadatumFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}
