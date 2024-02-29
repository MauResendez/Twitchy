
import { Button } from "@app/components/ui/button";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center">
      {/* <img
        alt="Illustration"
        className="aspect-video overflow-hidden object-cover rounded-lg"
        height="135"
        src="@app/assets/NotLikeThis.png"
        width="240"
      /> */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Oops! Page Not Found</h1>
        <p className="text-gray-500 text-xl/relaxed dark:text-gray-400 text-center">
          Sorry, we couldn't find the page you're looking for. 
        </p>
      </div>
      <Link
        className="inline-flex h-12 items-center rounded-md border border-gray-200 border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        href="/"
      >
        <Button className="w-full">
          Go back to the homepage
        </Button>
      </Link>
    </div>
  );
}  

export default Custom404;