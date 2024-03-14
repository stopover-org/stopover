"use client";

import "styles/globals.css";
import React from "react";
import "rc-slider/assets/index.css";
import "react-phone-input-2/lib/style.css";
import "@fontsource/public-sans";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <title>Stopover. Event Management</title>
    </head>

    <body>
      {children}
      <ProgressBar
        height="4px"
        color="#ff8a00"
        options={{ showSpinner: false }}
        shallowRouting
      />

      <div
        dangerouslySetInnerHTML={{
          __html: `
            <!-- Yandex.Metrika counter -->
            <script type="text/javascript" >
               (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
               m[i].l=1*new Date();
               for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
               k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
               (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
               ym(96547737, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
               });
            </script>
            <noscript><div><img src="https://mc.yandex.ru/watch/96547737" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
            <!-- /Yandex.Metrika counter -->
          `,
        }}
      />
    </body>
  </html>
);

export default React.memo(Layout);
