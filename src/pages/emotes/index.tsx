import { Card, CardContent, CardHeader } from "@app/components/ui/card";
import { Icons } from "@app/components/ui/spinner";
import { Emote } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Emotes = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['emotes'],
    queryFn: () =>
      axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getEmotes').then((response) => {
        response.data.emotes.sort(function(a: Emote, b: Emote) {
          var nameA = a.name.toUpperCase(); // Ignore case
          var nameB = b.name.toUpperCase(); // Ignore case
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          // names must be equal
          return 0;
        });
  
        return response.data.emotes;
      }),
  })

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="flex-1">
      <div className="container mx-auto grid gap-4 md:grid-cols-4 xl:grid-cols-6 p-4">
        {data.map((emote: Emote) => (
          <Link href={"/emotes/" + emote.sk} key={emote.sk}>
            <Card key={emote.sk}>
              <CardContent className="p-12 aspect-video">
                <Image
                  alt={emote.name}
                  className="object-cover w-full h-full"
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
    </main>
  );
}

export default Emotes;