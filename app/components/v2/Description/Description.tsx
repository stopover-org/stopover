import React from "react";

interface DescriptionProps {
  html: string;
}

export const descriptionClass = "description-class";

export const prepareStyles = (styles: string) =>
  styles
    .replace("h1", `.${descriptionClass} h1`)
    .replace("h2", `.${descriptionClass} h2`)
    .replace("h3", `.${descriptionClass} h3`)
    .replace("h4", `.${descriptionClass} h4`)
    .replace("h5", `.${descriptionClass} h5`)
    .replace("h6", `.${descriptionClass} h6`)
    .replace("pre", `.${descriptionClass} pre`);

const Description = ({ html }: DescriptionProps) => (
  <div
    className={descriptionClass}
    style={{ whiteSpace: "pre-wrap" }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default React.memo(Description);
