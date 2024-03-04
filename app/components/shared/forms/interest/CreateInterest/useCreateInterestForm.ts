import React from "react";
import * as Yup from "yup";

export interface CreateInterestFormFields {
  title: string;
  slug: string;
  preview: string;
}

function useDefaultValues(): CreateInterestFormFields {
  return React.useMemo(() => ({ title: "", slug: "", preview: "" }), []);
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  slug: Yup.string().required(),
  preview: Yup.string().required(),
});

export function useCreateInterestForm(onComplete: () => void) {
  console.log(useDefaultValues, validationSchema, onComplete);
  return null;
}
