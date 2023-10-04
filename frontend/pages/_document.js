import TwSizeIndicator from "@components/TwSizeIndicator";
import config from "@config/config.json";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  // destructuring items from config object
  const { favicon } = config.site;
  return (
    <Html lang="ar">
      <Head>
        {/* favicon */}
        <link rel="shortcut icon" href={favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="geeky-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic&family=Vazirmatn:wght@300&display=swap" rel="stylesheet"/>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
