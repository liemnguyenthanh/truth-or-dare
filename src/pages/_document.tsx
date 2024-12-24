import { Html, Head, Main, NextScript } from "next/document";

const URL = "https://a2tienbip.vercel.app";

const SEOPages = {
  title: "Truth or Dare",
  description: "Trò chơi dằm khăm của Mợ Linh, A2 Tiến, Chị Heo.",
  keywords:
    "Truth or Dare, Truth or Dare Game, Truth or Dare Game Online, Truth or Dare Game Online Free, Truth or Dare Game Online for Free, Truth or Dare Game Online for Free",
  thumbnail: `${URL}/thumbnail.png`,
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Truth or Dare</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="title" content={SEOPages.title} />
        <meta name="description" content={SEOPages.description} />
        <meta name="keywords" content={SEOPages.keywords} />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="emotion-insertion-point" content="" />

        <meta property="og:title" content={SEOPages.title} />
        <meta property="og:description" content={SEOPages.description} />
        <meta property="og:image" content={SEOPages.thumbnail} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="15087023444" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEOPages.title} />
        <meta name="twitter:description" content={SEOPages.description} />
        <meta name="twitter:image" content={SEOPages.thumbnail} />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
