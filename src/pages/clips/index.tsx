import { Card, CardContent, CardFooter, CardHeader } from "@app/components/ui/card";
import { Icons } from "@app/components/ui/spinner";
import { Clip } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Clips = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['clips'],
    queryFn: () =>
      axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getClips').then((response) => {
        response.data.clips.sort(function(a: Clip, b: Clip) {
          var nameA = a.view_count // Ignore case
          var nameB = b.view_count // Ignore case

          if (nameA > nameB) {
              return -1;
          }

          if (nameA < nameB) {
              return 1;
          }
          // names must be equal
          return 0;
        });
  
        return response.data.clips;
      }),
  })

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="flex-1">
      <div className="container mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4 p-4">
        {data.map((clip: Clip) => (
          <Link href={"/clips/" + clip.sk} key={clip.sk}>
            <Card key={clip.sk}>
              <CardContent className="p-0 aspect-video">
                <Image
                  alt="Stream"
                  className="object-cover w-full h-full"
                  height={225}
                  src={clip.thumbnail_url}
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </CardContent>
              <CardHeader className="space-y-0 p-4">
                <div className="flex items-center">
                  <div className="grid text-sm">
                    <h3 className="font-medium truncate">{clip.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{clip.broadcaster_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Playing: {clip.created_at}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Viewers: {clip.view_count}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Clips;