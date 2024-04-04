import Metatags from "@app/components/metatags";
import { Card, CardContent, CardHeader } from "@app/components/ui/card";
import { Icons } from "@app/components/ui/spinner";
import { Emote } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Emotes = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['emotes'],
    queryFn: async () => {
      const response = await axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getEmotes');

      const emotes: Emote[] = response.data.emotes;
      
      emotes.sort(function(a: Emote, b: Emote) {
        let nameA = a.name.toUpperCase(); // Ignore case
        let nameB = b.name.toUpperCase(); // Ignore case

        if (nameA < nameB) {
          return -1;
        }
        
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      return emotes;
    }
  });

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="container mx-auto flex flex-1 flex-col min-h-screen">
      <Metatags title="Twitchy - Emotes" description="View all global emotes from Twitch" />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-6 py-4">
        {data.map((emote: Emote) => (
          <Link href={`/emote?id=${emote.sk}`} key={emote.sk}>
            <Card key={emote.sk}>
              <CardContent className="px-16 py-10 aspect-video">
                <img
                  alt={emote.name}
                  className="object-cover w-full"
                  height={225}
                  src={emote.images.url_4x}
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "contain",
                  }}
                  width={400}
                />
              </CardContent>
              <CardHeader className="space-y-0 p-4">
                <div className="flex items-center justify-center">
                  <div className="grid text-sm">
                    <h3 className="font-medium">{emote.name}</h3>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Emotes;