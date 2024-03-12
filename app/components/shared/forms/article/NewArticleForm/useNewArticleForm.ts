import * as Yup from "yup";
import React from "react";
import useMutationForm from "lib/hooks/useMutationForm";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useNewArticleForm_CreateArticleMutation } from "artifacts/useNewArticleForm_CreateArticleMutation.graphql";

interface NewArticleFormFields {
  title: string;
  content: string;
  image: string;
  language: string;
  interestIds: string[];
}

function useDefaultValues(): NewArticleFormFields {
  return React.useMemo(
    () => ({
      title: "",
      content: "",
      image: "",
      language: "en",
      interestIds: [],
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required(),
  image: Yup.string().required(),
  language: Yup.string().required(),
});

export function useNewArticleForm() {
  const router = useRouter();
  return useMutationForm<
    NewArticleFormFields,
    useNewArticleForm_CreateArticleMutation
  >(
    graphql`
      mutation useNewArticleForm_CreateArticleMutation(
        $input: CreateArticleInput!
      ) {
        createArticle(input: $input) {
          article {
            id
            title
            content
          }
          notification
          errors
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.createArticle?.article?.id) {
          router.push(`/articles/${result.createArticle?.article?.id}`);
        }
      },
    }
  );
}
