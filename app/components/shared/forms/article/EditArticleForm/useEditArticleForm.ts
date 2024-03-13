import * as Yup from "yup";
import React from "react";
import useMutationForm from "lib/hooks/useMutationForm";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEditArticleForm_ArticleFragment$key } from "artifacts/useEditArticleForm_ArticleFragment.graphql";
import { useEditArticleForm_CreateArticleMutation } from "artifacts/useEditArticleForm_CreateArticleMutation.graphql";

interface NewArticleFormFields {
  articleId: string;
  title: string;
  content: string;
  image: string;
  language: string;
  interestIds: string[];
}

function useDefaultValues(
  articleFragmentRef: useEditArticleForm_ArticleFragment$key
): NewArticleFormFields {
  const article = useFragment(
    graphql`
      fragment useEditArticleForm_ArticleFragment on Article {
        id
        title
        content
        image
        language
        interests {
          id
        }
      }
    `,
    articleFragmentRef
  );
  return React.useMemo(
    () => ({
      articleId: article.id,
      title: article.title,
      content: article.content,
      image: article.image,
      language: article.language,
      interestIds: article.interests.map((interest) => interest.id),
    }),
    [article]
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required(),
  image: Yup.string().required(),
  language: Yup.string().required(),
});

export function useEditArticleForm(
  articleFragmentRef: useEditArticleForm_ArticleFragment$key
) {
  const router = useRouter();
  return useMutationForm<
    NewArticleFormFields,
    useEditArticleForm_CreateArticleMutation
  >(
    graphql`
      mutation useEditArticleForm_CreateArticleMutation(
        $input: UpdateArticleInput!
      ) {
        updateArticle(input: $input) {
          article {
            ...useEditArticleForm_ArticleFragment
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
      defaultValues: useDefaultValues(articleFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.updateArticle?.article?.id) {
          router.push(`/articles/${result.updateArticle?.article?.id}`);
        }
      },
    }
  );
}
