import React from "react";

export function useDocumentTitle(title: string) {
  React.useEffect(() => {
    Array.from(document.getElementsByTagName("title")).map((tag) =>
      tag.remove()
    );

    document.title = title;
  }, [title]);
}
