import headers from "next/headers";

export const mockCookies = ({
  accessToken,
  language,
}: {
  accessToken?: string;
  language: string;
}) => {
  (headers.cookies as any).mockImplementation(() => ({
    getAll: () => [
      {
        name: "access_token",
        value: accessToken,
      },
      {
        name: "i18next",
        value: language,
      },
    ],
  }));
};
