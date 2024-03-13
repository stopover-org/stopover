import { NextRequest, NextResponse } from "next/server";

export const LOCALES = ["en", "ru"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_QUERY_KEY = "language";
export const LOCALE_COOKIE_KEY = "i18next";

function getPathnameLocale(request: NextRequest) {
  const { pathname } = request.nextUrl;

  return LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

function getCookieLocale(request: NextRequest) {
  const { cookies } = request;

  return LOCALES.find(
    (locale) => locale === cookies.get(LOCALE_COOKIE_KEY)?.value
  );
}

function getQueryLocale(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  return LOCALES.find(
    (locale) => locale === searchParams.get(LOCALE_QUERY_KEY)
  );
}

function updateCookieLocale(request: NextRequest) {
  const cookieLocale = getCookieLocale(request);
  const queryLocale = getQueryLocale(request);
  const pathnameLocale = getPathnameLocale(request);

  if (queryLocale && queryLocale !== cookieLocale) {
    request.cookies.set(LOCALE_COOKIE_KEY, queryLocale || DEFAULT_LOCALE);
    return true;
  }

  if (pathnameLocale && pathnameLocale !== cookieLocale) {
    request.cookies.set(LOCALE_COOKIE_KEY, pathnameLocale || DEFAULT_LOCALE);
    return true;
  }

  if (!cookieLocale) {
    request.cookies.set(LOCALE_COOKIE_KEY, DEFAULT_LOCALE);
    return true;
  }

  return false;
}

function getBasePath(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameLocale = getPathnameLocale(request);

  // if pathname starts with locale then we need to remove it
  if (pathnameLocale) {
    const splittedPathname = pathname.split("/");

    // /path1/path2/path3 => ["", "path1", "path2", "path3"]
    if (pathname.startsWith("/")) {
      return splittedPathname.slice(2, splittedPathname.length).join("/");
    }
    // path1/path2/path3 => ["path1", "path2", "path3"]

    return splittedPathname.slice(1, splittedPathname.length).join("/");
  }

  // in other case do nothing
  return pathname;
}

function updatePathnameLocale(request: NextRequest) {
  const queryLocale = getQueryLocale(request);
  const pathnameLocale = getPathnameLocale(request);
  const cookiesLocale = getCookieLocale(request);
  const basePathname = getBasePath(request);
  const newLocale =
    queryLocale || pathnameLocale || cookiesLocale || DEFAULT_LOCALE;

  if (queryLocale) {
    const { nextUrl } = request;
    nextUrl.searchParams.delete(LOCALE_QUERY_KEY);
  }

  if (pathnameLocale !== newLocale) {
    request.nextUrl.pathname = `/${newLocale}/${basePathname}`;
    return true;
  }
  return false;
}

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const cookieChanged = updateCookieLocale(request);
  const pathnameChanged = updatePathnameLocale(request);

  if (cookieChanged && !pathnameChanged) {
    return NextResponse.rewrite(request.nextUrl);
  }

  if (cookieChanged && pathnameChanged) {
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|404.svg|502.svg|favicon.ico|icon.ico|icon.png|robots.txt|sitemap.xml|stopoverx.png|articles).*)",
  ],
};
