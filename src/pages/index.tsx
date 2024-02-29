import Metatags from "@app/components/metatags";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Metatags title="Twitchy" description="Discover new streams to watch, view channel statistics, and find the top clips of the week" />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Welcome to Twitchy
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Discover the best streams, analyze statistics, and compare your favorite streamers.
          </p>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <img
            alt="Find Streams"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full lg:order-last border border-white"
            height="310"
            src="/mixer.png"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Streams</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Find new streamers based on game, language, and viewer count.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
          <img
            alt="Statistics"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full border border-white"
            height="310"
            src="/statistics.png"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">View Statistics</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Get Twitch ranking and monthly statistics for viewers, followers, and stream time for each streamer.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <img
            alt="Clips"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full lg:order-last border border-white"
            height="310"
            src="/clips.png"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">View popular clips</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Find the most popular clips of the week.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;