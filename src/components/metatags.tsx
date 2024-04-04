import Head from 'next/head';

export default function Metatags({
  title = 'Twitchy',
  description = 'Explore the world of Twitch by finding new channels based on your interests, top clips of the week, and statistics based on weekly metrics.',
  image = 'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMy0xOC5wbmc.png',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@MauResendez" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="title" content={title} />
      <meta property="description" content={description} />
      <meta property="image" content={image} />
    </Head>
  );
}