import Head from 'next/head';

export default function Metatags({
  title = 'Twitchy',
  description = 'Explore the world of Twitch by finding new channels based on your interests, top clips of the week, and statistics based on weekly metrics.',
  image = 'https://fireship.io/courses/react-next-firebase/img/featured.png',
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